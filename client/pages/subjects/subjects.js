import Subject from '/lib/model/Subject.js'

Template.subjects.helpers({
	tableSettings : () => ({
		onRowClick: function(event) {
			Router.go(`/subjects/${this.code}`)
		}
	})
})

Template.subjects.events({
	'click [data-action=add]': function() { Router.go('/subjects/__new__') }
})