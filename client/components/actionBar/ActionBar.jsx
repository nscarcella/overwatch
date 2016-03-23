import {njsx, div, i} from '/client/reactNJSX.js'

const {keys} = Object

const ActionBar = ({actions = {}}) =>
	div('.actionBar')(
		keys(actions).map( (key, index) =>
			i(`.action.${key}`)({ key: index, 'data-action': key, title: key, onClick: actions[key] })
		)
	)()

export default njsx(ActionBar)