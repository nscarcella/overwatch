import Subject from '/imports/model/Subject.js'
import Course from '/imports/model/Course.js'
import Student from '/imports/model/Student.js'

const { assign } = Object
const { publish } = Meteor

publish ('userData', function(){ return Meteor.users.find({_id: this.userId}) })
publish ('subjects', function(criteria = {}){ return Subject.collection().find(criteria) })
publish ('courses', function(subjectCode, criteria = {}){
	const subject = Subject.collection().findOne({code: subjectCode})
	return Course.collection().find(assign({}, criteria, {_subjectId: subject._id}))
})
publish ('students', function(subjectCode, courseCode, criteria = {}){
	const subject = Subject.collection().findOne({code: subjectCode})
	const course = Course.collection().findOne({code: courseCode, _subjectId: subject._id})
	return Student.collection().find(assign({}, criteria, {_courseId: course._id}))
})