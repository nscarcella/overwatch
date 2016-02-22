Meteor.startup(function () {
	AutoForm.setDefaultTemplate('bootstrap3-horizontal')

	sAlert.config({
		effect: 'stackslide',
		position: 'top',
		timeout: 0,
		stack: false,
		offset: 60
	})

	tx.logging = false
})