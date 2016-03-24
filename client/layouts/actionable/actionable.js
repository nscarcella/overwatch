import actionBar from '/client/imports/components/actionBar/actionBar.js'
import {njsx, div, header, h1} from '/client/reactNJSX.js'

const Element = ({title='', actions={}, children}) =>
	div('.actionable')(
		header(
			h1(title),
			actionBar({actions})
		),
		div(children)
	)()

export default njsx(Element)