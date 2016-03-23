import DomainModel from './DomainModel.js'
import Course from './Course.js'

export default class Subject extends DomainModel({
	code: { type: String, unique: true,	min: 2,	listable: true },
	name: {	type: String,	min: 2,	listable: true }
}){

	get courses() { return Course.collection().find({_subjectId: this._id})}

	get actions() { return {
		openCourse() {
			Router.go('course.insert', this)
		},
		
		edit() { Router.go('subject.update', this) },
		
		delete() {
			this.constructor.collection().remove(this._id, {tx: true, instant: true, callback: (error) => {
				if (error) Alert.later.error(`Operation could not be performed. Cause: ${error}`)
				else Alert.later.success('The element was successfully deleted.', true)
				
				if(Router.current().route.getName() === 'subject.index') Alert.flush()
				else Router.go('subject.index')
			}})
		}
	}}
}