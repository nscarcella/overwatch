import Subject from '/lib/model/Subject.js'
import Course from '/lib/model/Course.js'

const { assign } = Object
const { publish } = Meteor

publish ('userData', function(){ return Meteor.users.find({_id: this.userId}) })
publish ('subjects', function(criteria = {}){ return Subject.collection().find(criteria) })
publish ('courses', function(subjectCode, criteria = {}){
	const subject = Subject.collection().findOne({code: subjectCode})
	return Course.collection().find(assign({}, criteria, {_subjectId: subject._id}))
})