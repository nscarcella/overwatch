import Student from '/lib/model/Student.js'

Template.CourseShow.helpers({
	tableSettings() { return {
		elementClass: Student
	}},
})