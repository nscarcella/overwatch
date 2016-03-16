import Subject from '/lib/model/Subject.js'

Template.SubjectEdit.onCreated(function(){
	AutoForm.addHooks('subject-edit', {
		onSuccess: (formType, result) => {
			Alert.later.success(formType === 'transactional-insert' ? 'Element inserted successfully.' : 'Element udated successfully', true)
			Router.go('subject.index')
		}
	})
})

Template.SubjectEdit.helpers({
	either(edit,create){return this.target._id ? edit : create },
})

Template.SubjectEdit.events({
	'click button.cancel'() {
		if(history.state && history.state.initial) Router.go('subject.index')
		else history.back()
	}
})