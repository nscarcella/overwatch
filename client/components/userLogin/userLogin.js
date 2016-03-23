// Template.userLogin.helpers({
// 	profileURL: () => {
// 		var user = Meteor.user()
// 		return user && user.services && user.services.google && user.services.google.picture
// 	}
// })
import {njsx, div} from '/client/reactNJSX.js'
import {Template} from "meteor/blaze-html-templates";

const loginButtons = njsx(BlazeToReact('loginButtons'))

const UserLogin = () =>
	div('.userLogin')(
		// currentUser ?	img.picture(src="#{profileURL}"),
		loginButtons({align: 'right'})
	)()

export default njsx(UserLogin)