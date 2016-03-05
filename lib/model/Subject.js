import DomainModel from './DomainModel.js'
import Course from './Course.js'

export default class Subject extends DomainModel({
	code: { type: String, unique: true,	min: 2,	listable: true },
	name: {	type: String,	min: 2,	listable: true },
	courses: { type: [Course], defaultValue: [] }
}){
	get actions() { return {
		openCourse: function() { Router.go(`/subjects/${this.code}/courses/__new__`) },
		
		edit: function() { Router.go(`/subjects/${this.code}/edit`) },
		
		delete: function() {
			this.constructor.collection().remove(this._id, {tx: true, instant: true, callback: (error) => {
				if (error) Alert.error(`Operation could not be performed. Cause: ${error}`)
				else Alert.success('The element was successfully deleted.', true)
			}})
		}
	}}
}