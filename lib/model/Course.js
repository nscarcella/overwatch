import DomainModel from './DomainModel.js'
import Student from './Student.js'

export default class Course extends DomainModel({
	code: { type: String, listable: true },
	year: { type: Number,	min: 2000, max: 2099, listable: true },
	quarter: { type: String, allowedValues: ['C1', 'C2', 'A'], listable: true },
	open: { type: Boolean, defaultValue: true, listable: true },
	students: { domainType: [Student], defaultValue: [] }
}){
	get actions() { return {
		close: function() { },
		
		edit: function() { Router.go('course.update', this) },
		
		delete: function() {
			this.constructor.collection().remove(this._id, {tx: true, instant: true, callback: (error) => {
				if (error) Alert.error(`Operation could not be performed. Cause: ${error}`)
				else Alert.success('The element was successfully deleted.', true)
			}})
		}
	}}
}