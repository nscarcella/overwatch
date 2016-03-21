import React from 'react'
import actionBar from '/client/components/actionBar/ActionBar.jsx'
import {njsxComponent, njsxElement, div, h1} from '/client/reactNJSX.js'

const Element = njsxComponent( ({title='', target={}, children}) =>
	div('.element')(
		div('.header')(
			h1(title),
			actionBar({actions: target.actions})
		),
		div('.content')(children)
	)
)

export default njsxElement(Element)