import '/imports/collections.js'
import Subject from '/imports/model/Subject.js'
import Course from '/imports/model/Course.js'

import {FlowRouter as Router} from 'meteor/kadira:flow-router'

import { render } from 'react-dom'
import { createContainer } from 'meteor/react-meteor-data'

import { njsx } from './reactNJSX.js'
import subjectIndex from '/client/pages/subject/SubjectIndex.jsx'
import mainLayout from '/client/layouts/mainLayout/mainLayout.js'

const { subscribe } = Meteor
const { assign } = Object

const reactContainer = document.body.appendChild(document.createElement('div'))

const njsxContainer = (element, setup) => njsx(createContainer(setup, props => element(props)()))



const subjects = Router.group({prefix: '/subjects'})
subjects.route('/', {
	name: 'subject.index',
	action: function(params, queryParams) {

		const subjectIndexPage = njsxContainer(subjectIndex, params => {
			const handle = subscribe('subjects')
			return {
				// loading: !handle.ready(),
				subjects: Subject.collection().find().fetch(),
				actions: { add(){ Router.go('subject.insert') } }
			}
		})

		const mainLayoutPage = njsxContainer(mainLayout(subjectIndexPage), params => {
			const handle = subscribe('userData')
			return {
				user: Meteor.user()
			}
		})

		render(mainLayoutPage(), reactContainer)
	}
})
subjects.route('/__new__', {name:'subject.insert'})

const subject = subjects.group({prefix: '/:code'})
subject.route('/', {name:'subject.show'})
subject.route('/edit', {name:'subject.update'})


const courses = subject.group({prefix: '/courses'})
courses.route('/', {name: 'course.index'})
courses.route('/__new__', {name: 'course.insert'})
const course = courses.group({prefix: '/:code'})
course.route('/', {name:'course.show'})
course.route('/edit', {name:'course.update'})


// Router.configure({
// 	layoutTemplate: 'layout',
// 	waitOn(){ return subscribe('userData') }
// })

// Router.onRun(function() {
// 	Alert.flush()
// 	this.next()
// })

// Router.route('/', function(){ this.redirect('subject.index') })

// Router.route('/subjects', {
// 	name: 'subject.index',
// 	waitOn() { return subscribe('subjects') },
// 	data() { return {
// 		collection: Subject.collection()
// 	}}
// })
// Router.route('/subjects/:code/edit', {
// 	name: 'subject.update',
// 	template: 'SubjectEdit',
// 	waitOn() { return subscribe('subjects', { code: this.params.code } ) },
// 	data() { return {
// 		collection: Subject.collection(),
// 		target: Subject.collection().findOne({code: this.params.code}, {reactive: false})
// 	}}
// })
// Router.route('/subjects/__new__', {
// 	name: 'subject.insert',
// 	template: 'SubjectEdit',
// 	data() { return {
// 		collection: Subject.collection(),
// 		target: new Subject()
// 	}}
// })
// Router.route('/subjects/:code', {
// 	name: 'subject.show',
// 	waitOn() { return [ subscribe('subjects', { code: this.params.code }), subscribe('courses', this.params.code) ] },
// 	data() { return {
// 		target: Subject.collection().findOne({code: this.params.code}, {reactive: false})
// 	}}
// })

// Router.route('/subjects/:code/courses/__new__', {
// 	name: 'course.insert',
// 	template: 'CourseEdit',
// 	data() {return {}}
// })
// Router.route('/subjects/:subjectCode/courses/:code', {
// 	name: 'course.show',
// 	waitOn() { return [
// 		subscribe('subjects', { code: this.params.subjectCode }),
// 		subscribe('courses', this.params.subjectCode, {code: this.params.code}),
// 		subscribe('students', this.params.subjectCode, this.params.code)
// 	]},
// 	data() { return {
// 		target: Course.collection().findOne({code: this.params.code}, {reactive: false})
// 	}}
// })
// Router.route('/subjects/:subjectCode/courses/:code/edit', {
// 	name: 'course.update',
// 	template: 'CourseEdit',
// 	waitOn() { return [
// 		subscribe('subjects', { code: this.params.subjectCode } ),
// 		subscribe('courses', this.params.subjectCode, {code: this.params.code})
// 	]},
// 	data() {
// 		const subject = Subject.collection().findOne({code: this.params.subjectCode}, {reactive: false})
// 		return {
// 			subject: subject,
// 			collection: Course.collection(),
// 			target: Course.collection().findOne({code: this.params.code, _subjectId: subject && subject._id}, {reactive: false})
// 		}
// 	}
// })