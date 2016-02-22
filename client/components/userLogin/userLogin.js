Template.userLogin.helpers({
	profileURL: () => {
		var user = Meteor.user()
		if(user) return user.services.google.picture
	}
})