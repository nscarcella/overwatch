import Subject from '/lib/model/Subject.js'

Template.SubjectIndex.helpers({
	tableSettings : () => ({
		onRowClick: function(event) {
			Router.go('subject.show', this)
		}
	})
})

Template.SubjectIndex.events({
	'click [data-action=add]': function() { Router.go('subject.insert') }
})