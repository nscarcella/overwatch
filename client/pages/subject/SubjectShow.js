import Course from '/lib/model/Course.js'

Template.SubjectShow.helpers({
	title() { return `${this.target.code}: ${this.target.name}` }, 
	tableSettings() { return {
		schema: Course.schema,
		elementClass: Course
	}},
	courses() { return this.target.courses }
})