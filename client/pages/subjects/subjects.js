Template.subjects.helpers({
	tableSettings : () => ({
		collection: Subjects,
		actions: ['delete']
	})
})

Template.subjects.events({
	'click .reactive-table tbody tr': function(event) { Router.go(`/subjects/${this.code}`) },
	'click [action=add]': function() { Router.go('/subjects/__new__') }
})