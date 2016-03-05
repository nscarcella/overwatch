import Subject from '/lib/model/Subject.js'

AutoForm.addHooks('subject-edit', {
	onSuccess: (formType, result) => {
		Alert.later.success(formType === 'transactional-insert' ? 'Element inserted successfully.' : 'Element udated successfully', true)
		Router.go('/subjects')
	}
})

const either = (context,edit,create) => context._id ? edit : create

Template['subject.edit'].helpers({
	title(){ return either(this.target, 'Edit Subject', 'Create Subject') },
	doc(){ return either(this.target, this.target, null) },
	formType(){ return either(this.target, 'transactional-update', 'transactional-insert')},
	submitText() { return either(this.target, 'Update', 'Create') }
})

Template['subject.edit'].events({
	'click button.cancel': () => Router.go('/subjects')
})