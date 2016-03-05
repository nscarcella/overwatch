import Course from '/lib/model/Course.js'

Template.SubjectShow.helpers({
	title() { return `${this.target.code}: ${this.target.name}` }, 
	tableSettings() { return {
		collection: this.target.courses,
		schema: Course.schema
	}}
})