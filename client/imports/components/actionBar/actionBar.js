import {njsx, div, i} from '/client/reactNJSX.js'

const {keys} = Object
const {__} = TAPi18n

const ActionBar = ({actions = {}}) =>
	div('.actionBar')(
		keys(actions).map( (key, index) =>
			i(`.action.${key}`)({ key: index, title: __(`action.${key}`), onClick: actions[key] })
		)
	)()

export default njsx(ActionBar)