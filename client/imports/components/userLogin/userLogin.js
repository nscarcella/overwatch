import {njsx, div, img, a} from '/client/reactNJSX.js'

const {__} = TAPi18n

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