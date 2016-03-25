import Subject from '/imports/model/Subject.js'

import actionable from '/client/layouts/actionable/actionable.js'
import domainModelTable from '/client/imports/components/domainModelTable/domainModelTable.js'
import {njsx} from '/client/reactNJSX.js'
import {FlowRouter as Router} from 'meteor/kadira:flow-router'

const {__} = TAPi18n

const SubjectIndex = ({subjects, actions}) =>
	actionable({title: __('subjects'), actions })(
		domainModelTable({domainClass: Subject, onRowClick: (subject) => Router.go('subject.show', subject), data: subjects})
	)()

export default njsx(SubjectIndex)