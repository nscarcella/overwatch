import React from 'react'
import {njsxComponent, njsxElement, div, h1, header, img} from '/client/reactNJSX.js'

const {__} = TAPi18n

const MainLayout = njsxComponent( ({children}) => {
	return div('.mainLayout')(
		header(
			img('.logo')({src: '/logo.png'}),
			h1(__('title'))
		),
		div('.container')(children)
	)
}
)

export default njsxElement(MainLayout)