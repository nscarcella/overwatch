// import Course from '/imports/model/Course.js'

// Template.CourseEdit.onCreated(function(){
// 	AutoForm.addHooks('course-edit', {
// 		onSuccess: (formType, result) => {
// 			Alert.later.success(formType === 'transactional-insert' ? 'Element inserted successfully.' : 'Element udated successfully', true)
// 			Router.go('subject.show', this.data.subject)
// 		}
// 	})
// })

// const either = (context,edit,create) => context._id ? edit : create

// Template.CourseEdit.helpers({
// 	title(){ return either(this.target, 'Edit Course', 'Create Course') },
// 	doc(){ return either(this.target, this.target, null) },
// 	formType(){ return either(this.target, 'transactional-update', 'transactional-insert')},
// 	submitText() { return either(this.target, 'Update', 'Create') }
// })

// Template.CourseEdit.events({
// 	'click button.cancel'() {
// 		if(history.state && history.state.initial) Router.go('subject.show', this.subject)
// 		else history.back()
// 	}
// })