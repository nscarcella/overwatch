const { defineProperty, assign, keys } = Object
const { isArray } = Array

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

		static createCollection(name = 'default') {
			const collection = new Mongo.Collection(`${this.name}-${name}`, { transform: doc => new this(doc) } )
			collection.attachSchema(schema)
			return collection
		}

		static collection(name = 'default') {
			return Mongo.Collection.get(`${this.name}-${name}`)
		}

		constructor(doc = {}) {
			defineProperty(this, 'doc', { value: doc instanceof this.constructor ? doc.doc : doc })

			for(const key of schema._firstLevelSchemaKeys) {
				if(!this[key])
					if(wrappedFields.indexOf(key) >= 0)
						defineProperty(this, key, {
							enumerable: true,
							get: function() {
								const constructor = schemaDescription[key].domainType
								return new constructor(this.doc[key])
							},
							set: function(value) {
								const constructor = schemaDescription[key].domainType
								this.doc[key] = value instanceof constructor ? value.doc : value
							}
						})
					else if (wrappedArrayFields.indexOf(key) >= 0)
						defineProperty(this, key, {
							enumerable: true,
							get: function() {
								const constructor = schemaDescription[key].domainType[0]
								return this.doc[key] ? this.doc[key].map(elem => new constructor(elem)) : this.doc[key]
							},
							set: function(value) {
								const constructor = schemaDescription[key].domainType[0]
								this.doc[key] = value ? value.map(elem => elem instanceof constructor ? elem.doc : elem) : value
							}
						})
					else defineProperty(this, key, {
						enumerable: true,
						get: function() { return this.doc[key] },
						set: function(value) { this.doc[key] = value }
					})

				this[key] = doc[key] === undefined ? schema.schema(key).defaultValue : doc[key]
			}
		}
	}
}