import DomainModel from './DomainModel.js'
import Course from './Course.js'

export default class Subject extends DomainModel({
	code: { type: String, unique: true,	min: 2,	listable: true },
	name: {	type: String,	min: 2,	listable: true },
	courses: { type: [Course.schema], defaultValue: [] }
}){
	get courses() { return this.doc.courses.map(course => new Course(course)) }

	get actions() { return {
		openCourse: function() { Router.go('course.insert') },
		
		edit: function() { Router.go('subject.update', this) },
		
		delete: function() {
			this.constructor.collection().remove(this._id, {tx: true, instant: true, callback: (error) => {
				if (error) Alert.error(`Operation could not be performed. Cause: ${error}`)
				else Alert.success('The element was successfully deleted.', true)
			}})
		}
	}}
}