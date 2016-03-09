import DomainModel from './DomainModel.js'
import Student from './Student.js'

export default class Course extends DomainModel({
	code: { type: String, listable: true },
	year: { type: Number,	min: 2000, max: 2099, listable: true },
	quarter: { type: String, allowedValues: ['C1', 'C2', 'A'], listable: true },
	open: { type: Boolean, defaultValue: true },
	students: { domainType: [Student], defaultValue: [] }
}){
	get actions() {
		const baseActions = {
			edit() { Router.go('course.update', this) },
			
			delete() {
			}
		}

		if(this.open) baseActions.closeCourse = function() { }

		return baseActions
	}
}