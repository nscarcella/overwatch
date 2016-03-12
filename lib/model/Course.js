import DomainModel from './DomainModel.js'
import Subject from './Subject.js'
import Student from './Student.js'

const { assign } = Object

export default class Course extends DomainModel({
	code: { type: String, listable: true },
	year: { type: Number,	min: 2000, max: 2099, listable: true },
	quarter: { type: String, allowedValues: ['C1', 'C2', 'A'], listable: true },
	open: { type: Boolean, defaultValue: true },
	students: { domainType: [Student], defaultValue: [] },
	_subjectId: { type: String, regEx: SimpleSchema.RegEx.Id }
}){

	get subject() { return Subject.collection().findOne({ _id: this.doc._subjectId }) }

	get actions() {
		let baseActions = {
			edit() { Router.go('course.update', {subjectCode: this.subject.code, code: this.code}) },
			
			delete() {
				this.constructor.collection().remove(this._id, {tx: true, instant: true, callback: error => {
					if (error) Alert.later.error(`Operation could not be performed. Cause: ${error}`)
					else Alert.later.success('The element was successfully deleted.', true)
					
					if(Router.current().route.getName() === 'subject.show') Alert.flush()
					else Router.go('subject.show', {code: this.subject.code})
				}})

			}
		}

		if(this.open) baseActions = assign({
			closeCourse() {
				this.constructor.collection().update(this._id, {$set: {open: !this.open}}, {tx: true, instant: true, callback: error => {
					if (error) Alert.error(`Operation could not be performed. Cause: ${error}`)
					else Alert.success(`Course ${this.code} successfully closed.`, true)
				}})
			}
		}, baseActions)

		return baseActions
	}
}