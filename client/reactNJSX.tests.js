import { expect } from 'meteor/practicalmeteor:chai'
import { njsxElement } from './reactNJSX.js'
import '/lib/jsExtensions.js'
import React from 'react'
import ReactDOM from'react-dom/server'

describe('NJSX', () => {

	describe('elements', () => {
		it('should be creatable from a type name', () => {
			const element = njsxElement('foo').createElement()

			expect(element).to.deep.equal(React.createElement('foo'))
		})
		
		it('should be creatable from a React component', () => {
			const component = class extends React.Component { render() { return React.createElement('foo') } }
			const element = njsxElement(component).createElement()

			expect(element).to.deep.equal(React.createElement(component))
		})
		
		it('should be creatable from a React functional component', () => {
			const component = () => React.createElement('foo')
			const element = njsxElement(component).createElement()

			expect(element).to.deep.equal(React.createElement(component))
		})

		it('should be refinable by passing attributes as a hash', () => {
			const element = njsxElement('foo')({bar: 'meh'}).createElement()

			expect(element).to.deep.equal(React.createElement('foo', {bar: 'meh'}))
		})

		it('should be refinable by passing a string representing a class name', () => {
			const element = njsxElement('foo')('.bar.meh').createElement()

			expect(element).to.deep.equal(React.createElement('foo', {className: 'bar meh'}))
		})

		it('should be refinable by passing a string representing content', () => {
			const element = njsxElement('foo')('bar').createElement()

			expect(element).to.deep.equal(React.createElement('foo', {}, 'bar'))
		})

		it('should be refinable by passing other elements as children', () => {
			const element = njsxElement('foo')(njsxElement('bar'), njsxElement('meh')).createElement()

			expect(element).to.deep.equal(React.createElement('foo', {}, React.createElement('bar'), React.createElement('meh')))
		})

		it('should be refinable by passing an array of children', () => {
			const element = njsxElement('foo')([njsxElement('bar'), njsxElement('meh')]).createElement()

			expect(element).to.deep.equal(React.createElement('foo', {}, React.createElement('bar'), React.createElement('meh')))
		})

	})

})