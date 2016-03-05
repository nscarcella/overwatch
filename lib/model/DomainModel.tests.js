import { expect } from 'meteor/practicalmeteor:chai'
import DomainModel from './DomainModel.js'

describe('DomainModel', () => {

	const schema = {
		foo: { type: String },
		bar: { type: Number, defaultValue: 0 }
	}

	const domainClass = class extends DomainModel(schema){}
	
	describe('classes', () => {

		it('should expose their schema as an immutable property', () => {
			domainClass.schema = null

			expect(domainClass.schema.schema()).to.deep.equal(schema)
		})
	
		it('should override default properties with overlapping class definition', () => {
			const domainClass = class extends DomainModel(schema){ get bar() { return 9 } }
			const instance = new domainClass()

			expect(instance.bar).to.equal(9)
		})

		describe('collections', () => {
			let collection

			before(() => {
				collection = domainClass.collection() || domainClass.createCollection()
			})

			after(() => {
			})

			beforeEach(() => {
				for(const { _id } of collection.find().fetch()) collection.remove({_id})
			})

			it('should be accessible via the "collection" method', () => {
				expect(domainClass.collection()).to.equal(collection)
			})

			it('should be possible to create different collections by providing a name', () => {
				const otherCollection = domainClass.collection('other') || domainClass.createCollection('other')

				expect(domainClass.collection('other')).to.equal(otherCollection)
				expect(domainClass.collection('other')).to.not.equal(collection)
			})

			it('should have the creator class schema attached', () => {
				expect(collection.simpleSchema()).to.deep.equal(domainClass.schema)
			})

			it('should automatically wrap content with the creator class', () => {
				collection.insert( new domainClass({ foo: "Foo" }) )
				
				expect(collection.findOne()).to.be.an.instanceof(domainClass)
			})
		})
		
	})

	describe('instances', () => {
		let doc, instance

		beforeEach(() => {
			doc = { foo: 'Foo', bar: 5 }
			instance = new domainClass(doc)
		})

		it('should have the created class as constructor', () => {
			expect(instance.constructor).to.equal(domainClass)
		})

		it('should expose schema fields as properties', () => {
			expect(instance).to.have.all.keys(schema)
		})

		it('should expose their docs as immutable properties', () => {
			instance.doc = null

			expect(instance).to.have.property('doc', doc)
		})

		it('should reflect doc changes on the properties', () => {
			doc.foo = 'Bar'

			expect(instance.foo).to.equal('Bar')
		})

		it('should reflect property changes on the doc', () => {
			instance.foo = 'Bar'

			expect(doc.foo).to.equal('Bar')
		})

		describe('initialization', () => {

			it('should set the properties from the constructor argument', () => {
				expect(instance.foo).to.equal('Foo')
				expect(instance.bar).to.equal(5)
			})

			it('should set the properties with the schema default value if constructor argument is missing', () => {
				const instance = new domainClass()

				expect(instance.foo).to.equal(undefined)
				expect(instance.bar).to.equal(0)
			})

			it('should set any property missing on the constructor argument to the schema default value', () => {
				const instance = new domainClass({foo: 'Foo'})

				expect(instance.foo).to.equal('Foo')
				expect(instance.bar).to.equal(0)
			})

			it('should ignore any constructor argument property not present in the schema', () => {
				const instance = new domainClass({meh: true})

				expect(instance.meh).to.not.exist
			})
		})

	})

})