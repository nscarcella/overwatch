import Subject from '/lib/model/Subject.js'

Template.SubjectIndex.helpers({
	tableSettings() { return {
		elementClass: Subject,
		onRowClick: function(subject) {
			Router.go('subject.show', subject)
		}
	}},
	actions() { return {
		actions: { add() { Router.go('subject.insert') } }
	}}
})