Template.subject.helpers({
	title() { return `${this.code}: ${this.name}` }, 
	tableSettings() { return {
		collection: this.courses,
		schema: Course
	}}
})