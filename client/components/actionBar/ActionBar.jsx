import React from 'react'
import {njsxComponent, njsxElement, div, i} from '/client/reactNJSX.js'

const {keys} = Object

const ActionBar = njsxComponent( ({actions = {}}) =>
	div('.actionBar')(
		keys(actions).map( (key, index) =>
			i(`.action.${key}`)({ key: index, 'data-action': key, title: key, onClick: actions[key] })
		)
	)
)

export default njsxElement(ActionBar)
