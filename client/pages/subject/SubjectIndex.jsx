import Subject from '/lib/model/Subject.js'
import React from 'react'
import underscore from 'underscore'
import Griddle from 'griddle-react'

const {__} = TAPi18n

// Template.SubjectIndex.helpers({
// 	tableSettings() { return {
// 		elementClass: Subject,
// 		onRowClick: function(subject) {
// 			Router.go('subject.show', subject)
// 		}
// 	}},
// 	actions() { return {
// 		actions: { add() { Router.go('subject.insert') } }
// 	}}
// })

import actionBar from '/client/components/actionBar/ActionBar.jsx'
import element from '/client/layouts/element/Element.jsx'
import {njsxComponent, njsxElement, div, i} from '/client/reactNJSX.js'

const griddle = njsxElement(Griddle)

const SubjectIndex = njsxComponent( ({subjects}) =>
	element({title: __('subjects'), target: {actions: {add(){ console.log("YEAH!") } }} })(
		griddle({useGriddleStyles:true, columns:['code', 'name'], results: subjects})
	)
)

export default njsxElement(SubjectIndex)