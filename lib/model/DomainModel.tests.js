import { expect } from 'meteor/practicalmeteor:chai'
import DomainModel from './DomainModel.js'
import '/lib/config/simpleSchema.js'

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

	describe('domainType', () => {
		const A = class extends DomainModel({name: {type: String}}){} 
		const B = class extends DomainModel({ a: { domainType: A }, as: {domainType: [A]} }){}

		it('should set the schema type to be the schema of the domain type', () => {
			expect(B.schema._schemaKeys).to.have.all.members(['a', 'as', 'a.name', 'as.$.name', 'as.$'])
		})

		it('should define enumerable property to access it', () => {
			const instance = new B()
			expect(instance).to.have.property('a')
			expect(instance).to.have.property('as')
		})

		it('should be initializable using hashes or domain model instances', () => {
			const doc = {a: {name: 'foo'}, as: [{name: 'bar'}]}
			const hashInstance = new B(doc)
			const classInstance = new B({a: new A({name: 'foo'}), as: [ new A({name: 'bar'}) ] })
			const wrapInstance = new B(classInstance)

			expect(hashInstance.doc)
				.to.deep.equal(doc)
				.with.ownProperty('a').not.instanceof(A)
				.and.ownProperty('as[0]').not.instanceof(A)

			expect(classInstance.doc)
				.to.deep.equal(doc)
				.with.ownProperty('a').not.instanceof(A)
				.and.ownProperty('as[0]').not.instanceof(A)

			expect(wrapInstance.doc)
				.to.deep.equal(doc)
				.with.ownProperty('a').not.instanceof(A)
				.and.ownProperty('as[0]').not.instanceof(A)
		})

		it('should get the field wrapping the inner doc field in the domain type', () => {
			const instance = new B()
			instance.doc.a = {name: 'foo'}
			instance.doc.as = [{name: 'bar'}]

			expect(instance.a).to.be.an.instanceof(A).and.to.deep.equal(new A(instance.doc.a))
			expect(instance.as).to.have.all.deep.members([ new A({name: 'bar'}) ])
		})

		it('should set the inner doc field unwrapping the domain type', () => {
			const instance = new B()

			instance.a = new A({name: 'foo'})
			instance.as = [new A({name: 'bar'})]

			expect(instance.doc.a)
				.to.deep.equal({name: 'foo'})
				.and.not.be.instanceof(A)
			expect(instance.doc.as)
				.to.have.all.deep.members([{name: 'bar'}])
				.and.all.not.be.instanceof(A)
		})

		it('should set the inner doc field from non-wrapped hashes', () => {
			const instance = new B()

			instance.a = {name: 'foo'}
			instance.as = [{name: 'bar'}]

			expect(instance.doc.a)
				.to.deep.equal({name: 'foo'})
				.and.not.be.instanceof(A)
			expect(instance.doc.as)
				.to.have.all.deep.members([{name: 'bar'}])
				.and.all.not.be.instanceof(A)
		})

	})

})