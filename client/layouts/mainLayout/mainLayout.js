import {njsx, div, h1, header, img} from '/client/reactNJSX.js'
import userLogin from '/client/imports/components/userLogin/userLogin.js'

const {__} = TAPi18n

const MainLayout = ({user, children}) =>
	div('.mainLayout')(
		header(
			img('.logo')({src: '/logo.png'}),
			h1(__('title')),
			userLogin({user})
		),
		div('.container')(children)
	)()

export default njsx(MainLayout)