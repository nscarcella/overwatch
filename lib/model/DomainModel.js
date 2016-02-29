export default function (schemaData) {
	const schema = new SimpleSchema(schemaData)

	const metaclass = class {
		constructor(doc) {
			schema.clean(doc)

			Object.defineProperty(this, 'doc', {value: doc})

			for(const key of schema._firstLevelSchemaKeys)
				Object.defineProperty(this, key, {
					enumerable: true,
					get: function() { return this.doc[key] },
					set: function(value) { this.doc[key] = value }
				})

		}
	}

	Object.defineProperty(Object.getPrototypeOf(metaclass),'schema', {value: schema})
	
	Object.getPrototypeOf(metaclass).createCollection = function(name) {
		const collection = new Mongo.Collection(name, {transform: doc => new this(doc)})
		collection.attachSchema(schema)
		return collection
	}

	return metaclass
}