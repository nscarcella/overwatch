Template.subject.helpers({
	title() { return `${this.code}: ${this.name}` }, 
	tableSettings() { return {
		collection: this.courses,
		schema: Course,
		rowsPerPage: 5,
		actions: ['edit', 'delete']
	}}
})

Template.subject.events({
	'click [action=add]': function() { Router.go('/subject/__new__') }
})