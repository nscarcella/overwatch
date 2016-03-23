import actionBar from '/client/components/actionBar/ActionBar.jsx'
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