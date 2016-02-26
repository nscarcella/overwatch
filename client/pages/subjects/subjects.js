Template.subjects.helpers({
	tableSettings : () => ({
		collection: Subjects,
		rowsPerPage: 5,
		actions: ['edit', 'delete']
	})
})

Template.subjects.events({
	'click .reactive-table tbody tr': function(event) { Router.go(`/subjects/${this.code}`) },
	'click [data-action=add]': function() { Router.go('/subjects/__new__') }
})