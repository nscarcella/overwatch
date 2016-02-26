AutoForm.addHooks('subject-edit', {
	onSuccess: (formType, result) => {
		Alert.later.success(formType === 'transactional-insert' ? 'Element inserted successfully.' : 'Element udated successfully', true)
		Router.go('/subjects')
	}
})

const either = (context,edit,create) => context._id ? edit : create
Template['subject.edit'].helpers({
	title: either(this, 'Edit Subject', 'Create Subject'),
	doc: either(this, this, null),
	formType: either(this, 'transactional-update', 'transactional-insert'),
	submitText: either(this, 'Update', 'Create')
})

Template['subject.edit'].events({
	'click button.cancel': () => Router.go('/subjects')
})