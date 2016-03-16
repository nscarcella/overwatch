// import Course from '/lib/model/Course.js'

// Template.SubjectShow.helpers({
// 	title() { return `${this.target.code}: ${this.target.name}` }, 
// 	tableSettings() { return {
// 		elementClass: Course,
// 		onRowClick: (course) => {
// 			Router.go('course.show', {subjectCode: this.target.code, code: course.code} )
// 		}
// 	}},
// 	openCourses() { return this.target.courses.fetch().filter(course => course.open) },
// 	closedCourses() { return this.target.courses.fetch().filter(course => !course.open) }
// })