import Course from '/lib/model/Course.js'
import Student from '/lib/model/Student.js'

Template.CourseShow.helpers({
	tableSettings() { return {
		elementClass: Student
	}},
	collection() { return Course.collection() }
})