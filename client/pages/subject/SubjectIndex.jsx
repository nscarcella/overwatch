import Subject from '/imports/model/Subject.js'
import Griddle from 'griddle-react'

import actionable from '/client/layouts/actionable/actionable.js'
import {njsx} from '/client/reactNJSX.js'

const {__} = TAPi18n

const griddle = njsx(Griddle)

const SubjectIndex = ({subjects, actions}) =>
	actionable({title: __('subjects'), actions })(
		griddle({useGriddleStyles:true, columns:['code', 'name'], results: subjects})
	)()

export default njsx(SubjectIndex)