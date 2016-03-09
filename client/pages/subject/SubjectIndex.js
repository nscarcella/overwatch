import Subject from '/lib/model/Subject.js'

Template.SubjectIndex.helpers({
	tableSettings() { return {
		elementClass: Subject,
		onRowClick: function(subject) {
			Router.go('subject.show', subject)
		}
	}}
})

Template.SubjectIndex.events({
	'click [data-action=add]': function() { Router.go('subject.insert') }
})