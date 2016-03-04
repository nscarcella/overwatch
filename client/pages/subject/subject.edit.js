import { Subjects } from '/lib/collections.js'

AutoForm.addHooks('subject-edit', {
	onSuccess: (formType, result) => {
		Alert.later.success(formType === 'transactional-insert' ? 'Element inserted successfully.' : 'Element udated successfully', true)
		Router.go('/subjects')
	}
})

const either = (context,edit,create) => context._id ? edit : create

Template['subject.edit'].helpers({
	collection() {return Subjects },
	title(){ return either(this, 'Edit Subject', 'Create Subject') },
	doc(){ return either(this, this, null) },
	formType(){ return either(this, 'transactional-update', 'transactional-insert')},
	submitText() { return either(this, 'Update', 'Create') }
})

Template['subject.edit'].events({
	'click button.cancel': () => Router.go('/subjects')
})