import {Subjects} from '/lib/model/Subject'

Template.subjects.helpers({
	tableSettings : () => ({
		collection: Subjects,
		onRowClick: function(event) {
			Router.go(`/subjects/${this.code}`)
		}
	})
})

Template.subjects.events({
	'click [data-action=add]': function() { Router.go('/subjects/__new__') }
})