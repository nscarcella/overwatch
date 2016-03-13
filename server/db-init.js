import Subject from '/lib/model/Subject.js'
import Course from '/lib/model/Course.js'
import Student from '/lib/model/Student.js'

const shouldRun = true

Meteor.startup(() => {
	if(shouldRun) Promise.resolve(console.log('Initing DBs'))
		.then(() => Promise.all([
			new Promise(resolve => Course.collection().remove({}, resolve) ),
			new Promise(resolve => Subject.collection().remove({}, resolve) ),
			new Promise(resolve => Student.collection().remove({}, resolve) )
		]))
		.then(() => Subject.collection().insert({name: 'Materia 01', code: 'M01'}))
		.then(newSubject => {
			Course.collection().insert({_subjectId: newSubject, code: 'M01C01', year: 2013, quarter: 'A', open: false})
			Course.collection().insert({_subjectId: newSubject, code: 'M01C02', year: 2014, quarter: 'A', open: false})
			Course.collection().insert({_subjectId: newSubject, code: 'M01C03', year: 2014, quarter: 'C1', open: false})
			Course.collection().insert({_subjectId: newSubject, code: 'M01C04', year: 2014, quarter: 'C2', open: false})
			Course.collection().insert({_subjectId: newSubject, code: 'M01C05', year: 2015, quarter: 'A', open: false})
			Course.collection().insert({_subjectId: newSubject, code: 'M01C06', year: 2015, quarter: 'C1', open: false})
			Course.collection().insert({_subjectId: newSubject, code: 'M01C07', year: 2015, quarter: 'C2', open: false})
			Course.collection().insert({_subjectId: newSubject, code: 'M01C08', year: 2016, quarter: 'C1', open: true})
			return Course.collection().insert({_subjectId: newSubject, code: 'M01C09', year: 2016, quarter: 'A', open: true})
		})
		.then(newCourse => {
			Student.collection().insert({firstName: 'Tito', lastName: 'Puente', idNumber: '1191910', _courseId: newCourse})
			Student.collection().insert({firstName: 'Raul', lastName: 'Porchetto', idNumber: '1191911', _courseId: newCourse})
			Student.collection().insert({firstName: 'Emilio', lastName: 'Dissi', idNumber: '1191912', _courseId: newCourse})
			Student.collection().insert({firstName: 'Juana', lastName: 'Molina', idNumber: '1191913', _courseId: newCourse})
			Student.collection().insert({firstName: 'Teto', lastName: 'Medina', idNumber: '1191914', _courseId: newCourse})
			Student.collection().insert({firstName: 'Alfredo', lastName: 'Casero', idNumber: '1191915', _courseId: newCourse})
			Student.collection().insert({firstName: 'Marco', lastName: 'Polo', idNumber: '1191916', _courseId: newCourse})
			Student.collection().insert({firstName: 'Andrea', lastName: 'Frigerio', idNumber: '1191917', _courseId: newCourse})
			Student.collection().insert({firstName: 'Beto', lastName: 'Alonso', idNumber: '1191918', _courseId: newCourse})
			Student.collection().insert({firstName: 'Yiya', lastName: 'Murano', idNumber: '1191919', _courseId: newCourse})
		})
		.then(() => {
			Subject.collection().insert({name: 'Materia 02', code: 'M02'})
			Subject.collection().insert({name: 'Materia 03', code: 'M03'})
			Subject.collection().insert({name: 'Materia 04', code: 'M04'})
			Subject.collection().insert({name: 'Materia 05', code: 'M05'})
			Subject.collection().insert({name: 'Materia 06', code: 'M06'})
			Subject.collection().insert({name: 'Materia 07', code: 'M07'})
			Subject.collection().insert({name: 'Materia 08', code: 'M08'})
			Subject.collection().insert({name: 'Materia 09', code: 'M09'})
			Subject.collection().insert({name: 'Materia 10', code: 'M10'})
			Subject.collection().insert({name: 'Materia 11', code: 'M11'})
			Subject.collection().insert({name: 'Materia 12', code: 'M12'})
			Subject.collection().insert({name: 'Materia 13', code: 'M13'})
			Subject.collection().insert({name: 'Materia 14', code: 'M14'})
			Subject.collection().insert({name: 'Materia 15', code: 'M15'})
			Subject.collection().insert({name: 'Materia 16', code: 'M16'})
			Subject.collection().insert({name: 'Materia 17', code: 'M17'})
			Subject.collection().insert({name: 'Materia 18', code: 'M18'})
			Subject.collection().insert({name: 'Materia 19', code: 'M19'})
			Subject.collection().insert({name: 'Materia 20', code: 'M20'})
		})
		.then(() => console.log('Done!'))
		.catch(error => console.log(`DB-init ${error}`))
	
})