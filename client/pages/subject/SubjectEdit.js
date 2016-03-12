import Subject from '/lib/model/Subject.js'

Template.SubjectEdit.onCreated(function(){
	AutoForm.addHooks('subject-edit', {
		onSuccess: (formType, result) => {
			Alert.later.success(formType === 'transactional-insert' ? 'Element inserted successfully.' : 'Element udated successfully', true)
			Router.go('subject.index')
		}
	})
})

const either = (context,edit,create) => context._id ? edit : create

Template.SubjectEdit.helpers({
	title(){ return either(this.target, 'Edit Subject', 'Create Subject') },
	doc(){ return either(this.target, this.target, null) },
	formType(){ return either(this.target, 'transactional-update', 'transactional-insert')},
	submitText() { return either(this.target, 'Update', 'Create') }
})

Template.SubjectEdit.events({
	'click button.cancel'() {
		if(history.state && history.state.initial) Router.go('subject.index')
		else history.back()
	}
})