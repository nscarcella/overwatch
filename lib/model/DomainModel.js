const { defineProperty } = Object

export default function DomainModel(schemaDescription){
	const schema = new SimpleSchema(schemaDescription)

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
			defineProperty(this, 'doc', { value: doc })

			for(const key of schema._firstLevelSchemaKeys) {
				if(doc[key] === undefined) doc[key] = schema.schema(key).defaultValue

				if(!this[key])
					defineProperty(this, key, {
						enumerable: true,
						get: function() { return this.doc[key] },
						set: function(value) { this.doc[key] = value }
					})
			}
		}
	}
}