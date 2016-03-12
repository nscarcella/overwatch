Template.userLogin.helpers({
	profileURL: () => {
		var user = Meteor.user()
		return user && user.services && user.services.google && user.services.google.picture
	}
})