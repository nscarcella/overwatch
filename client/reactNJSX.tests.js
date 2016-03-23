import { expect } from 'meteor/practicalmeteor:chai'
import { njsx } from './reactNJSX.js'
import {createElement as createReactElement, Component as ReactComponent} from 'react'
import '/imports/jsExtensions.js'

describe('NJSX', () => {

	describe('elements', () => {
		it('should be creatable from a type name', () => {
			const element = njsx('foo')()

			expect(element).to.deep.equal(createReactElement('foo'))
		})
		
		it('should be creatable from a React component', () => {
			const component = class extends ReactComponent { render() { return createReactElement('foo') } }
			const element = njsx(component)()

			expect(element).to.deep.equal(createReactElement(component))
		})
		
		it('should be creatable from a React functional component', () => {
			const component = () => createReactElement('foo')
			const element = njsx(component)()

			expect(element).to.deep.equal(createReactElement(component))
		})

		it('should be refinable by passing attributes as a hash', () => {
			const element = njsx('foo')({bar: 'meh'})()

			expect(element).to.deep.equal(createReactElement('foo', {bar: 'meh'}))
		})

		it('should be refinable by passing a string representing a class name', () => {
			const element = njsx('foo')('.bar.meh')()

			expect(element).to.deep.equal(createReactElement('foo', {className: 'bar meh'}))
		})

		it('should be refinable by passing a string representing content', () => {
			const element = njsx('foo')('bar')()

			expect(element).to.deep.equal(createReactElement('foo', {}, 'bar'))
		})

		it('should be refinable by passing other elements as children', () => {
			const element = njsx('foo')(njsx('bar'), njsx('meh'))()

			expect(element).to.deep.equal(createReactElement('foo', {}, createReactElement('bar'), createReactElement('meh')))
		})

		it('should be refinable by passing an array of children', () => {
			const element = njsx('foo')([njsx('bar'), njsx('meh')])()

			expect(element).to.deep.equal(createReactElement('foo', {}, createReactElement('bar'), createReactElement('meh')))
		})

	})

})