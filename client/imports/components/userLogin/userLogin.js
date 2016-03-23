import {njsx, div, img, a} from '/client/reactNJSX.js'
import {Template} from "meteor/blaze-html-templates";

const {__} = TAPi18n

const loginButtons = njsx(BlazeToReact('loginButtons'))

const UserLogin = ({user}) =>
	div('.userLogin')(
		user
		? [
			user.services ? img({src: user.services.google.picture}) : [],
			a({onClick: () => Meteor.logout()})(__('login.signOut'))
		]
		: a({onClick: () => Meteor.loginWithGoogle()})(__('login.signIn'))
	)()

export default njsx(UserLogin)