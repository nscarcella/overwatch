const {OneOf, Optional} = Match
const { defineProperty, assign, keys } = Object
const { isArray } = Array

SimpleSchema.extendOptions({
	domainType: Optional(OneOf(Array, Function)),
	listable: Optional(Boolean)
})

export default function DomainModel(schemaDescription){
	const transformedSchemaDescription = assign({}, schemaDescription)
	const wrappedFields = keys(schemaDescription).filter(key => schemaDescription[key].domainType && !isArray(schemaDescription[key].domainType))
	const wrappedArrayFields = keys(schemaDescription).filter(key => schemaDescription[key].domainType && isArray(schemaDescription[key].domainType))

	for(const key of wrappedFields)
		schemaDescription[key].type = schemaDescription[key].domainType.schema
	
	for(const key of wrappedArrayFields)
		schemaDescription[key].type = [schemaDescription[key].domainType[0].schema]

	const schema = new SimpleSchema(transformedSchemaDescription)

	return class {
		static get schema() { return schema }

		static createCollection(name, elements = []) {
			const realName = name === null  ? null : `${this.name}-${name === undefined ? 'default' : name}`
			const collection = new Mongo.Collection(realName, { transform: doc => new this(doc) } )
			collection.attachSchema(schema)

			for(const elem of elements)
				collection.insert(elem)

			return collection
		}

		static collection(name) {
			const realName = name === null  ? null : `${this.name}-${name === undefined ? 'default' : name}`
			return Mongo.Collection.get(realName)
		}

		constructor(doc = {}, owner) {
			defineProperty(this, 'owner', { writable: true, value: owner })
			defineProperty(this, 'doc', { value: doc instanceof this.constructor ? doc.doc : doc })

			for(const key of schema._firstLevelSchemaKeys) {
				if(!this[key]) {
					if(wrappedFields.includes(key))
						defineProperty(this, key, {
							enumerable: true,
							get() {
								const constructor = schemaDescription[key].domainType
								return new constructor(this.doc[key], this)
							},
							set(value) {
								const constructor = schemaDescription[key].domainType
								this.doc[key] = value instanceof constructor ? value.doc : value
							}
						})
					else if (wrappedArrayFields.includes(key))
						defineProperty(this, key, {
							enumerable: true,
							get() {
								const constructor = schemaDescription[key].domainType[0]
								return this.doc[key] ? this.doc[key].map(elem => new constructor(elem, this)) : this.doc[key]
							},
							set(value) {
								const constructor = schemaDescription[key].domainType[0]
								this.doc[key] = value ? value.map(elem => elem instanceof constructor ? elem.doc : elem) : value
							}
						})
					else defineProperty(this, key, {
						enumerable: true,
						get: function() { return this.doc[key] },
						set: function(value) { this.doc[key] = value }
					})
				}

				this[key] = doc[key] === undefined ? schema.schema(key).defaultValue : doc[key]
			}
		}
	}
}