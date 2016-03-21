import Subject from '/lib/model/Subject.js'
import Course from '/lib/model/Course.js'

import {FlowRouter as Router} from 'meteor/kadira:flow-router'
import {SubjectIndex, subjectIndex} from '/client/pages/subject/SubjectIndex.jsx'
import mainLayout from '/client/layouts/mainLayout/MainLayout.jsx'

import React from 'react'
import { createContainer } from 'meteor/react-meteor-data'

import ReactDOM from 'react-dom'

const { subscribe } = Meteor


const reactContainer = document.createElement('div')
reactContainer.setAttribute('id', 'react-container')
document.body.appendChild(reactContainer)

// const baseRender = ReactDOM.render
// ReactDOM.render = function(what,where){ return baseRender(what.isNJSX ? what.create() : what, where) }

Router.route('/subjects', {
	action: function(params, queryParams) {
		
		const subjectIndexPage = createContainer(params => {
			const handle = subscribe('subjects')
			return {
				loading: !handle.ready(),
				subjects: Subject.collection().find().fetch()
			}
		// }, props => subjectIndex(props).createElement())
		}, SubjectIndex)

		// ReactDOM.render(React.createElement(subjectIndexPage), reactContainer)
		ReactDOM.render(React.createElement(()=> mainLayout(subjectIndex({subjects:[{code: 'M01', name: 'materia'}]})).createElement()), reactContainer)
	}
})

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