const {defineProperty} = Object

export default function DomainModel(schemaDescription, classDefinition = {}) {
	const schema = new SimpleSchema(schemaDescription)

	const domainClass = class {
		static get schema() { return schema }

		static createCollection(name) {
			const collection = new Mongo.Collection(name, { transform: doc => new this(doc) } )
			collection.attachSchema(schema)
			return collection
		}

		constructor(doc = {}) {
			defineProperty(this, 'doc', { value: doc })

			for(const key of schema._firstLevelSchemaKeys) {
				if(doc[key] === undefined) doc[key] = schema.schema(key).defaultValue
	
				if(!classDefinition.hasOwnProperty(key))
					defineProperty(this, key, {
						enumerable: true,
						get: function() { return this.doc[key] },
						set: function(value) { this.doc[key] = value }
					})
			}
		}
	}

	domainClass.prototype = classDefinition

	return domainClass
}