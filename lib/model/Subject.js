import DomainModel from './DomainModel.js'
import Course from './Course.js'

export default class Subject extends DomainModel({
	code: { type: String, unique: true,	min: 2,	listable: true },
	name: {	type: String,	min: 2,	listable: true },
	courses: { domainType: [Course], defaultValue: [] }
}){
	get courses() { return this.doc.courses.map(course => new Course(course)) }

	constructor(doc){
		super(doc)
		Object.defineProperty(this, 'courses', {
			enumerable: true,
			get: function() { return this.doc.courses.map(course => new Course(course)) },
			set: function(value) { this.doc.courses = value.map(course => course.doc) }
		})
	}

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