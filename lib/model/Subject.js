import DomainModel from './DomainModel'

// export const Evaluation = new SimpleSchema({
//	 name: {
//		 type: String,
//		 unique: true,
//		 sparse: true
//	 }
// })

// export const EvaluationInstance = new SimpleSchema({
//	 evaluation: {
//		 type: Evaluation,
//		 unique: true,
//		 sparse: true
//	 },
//	 calification: {
//		 type: Number,
//		 min: 2,
//		 max: 10
//	 }
// })

// export const Student = new SimpleSchema({
//	 firstName: {
//		 type: String
//	 },
//	 lastName: {
//		 type: String
//	 },
//	 idNumber: {
//		 type: String,
//		 regEx: /^[0-9]+$/,
//		 unique: true,
//		 sparse: true
//	 },
//	 approvalStatus: {
//		 type: String,
//		 allowedValues: ['Coursing', 'Can be Signed', 'Signed', 'Quitted'],
//		 defaultValue: 'Coursing'
//	 },
//	 legalStatus: {
//		 type: String,
//		 allowedValues: ['Enrolled', 'Auditing']
//	 },
//	 teacherCandidate: {
//		 type: Boolean,
//		 defaultValue: false
//	 },
//	 evaluationInstances: {
//		 type: [EvaluationInstance],
//		 defaultValue: []
//	 }
// })

// export const Course = new SimpleSchema({
//	 code: {
//		 type: String,
//		 listable: true
//	 },
//	 year: {
//		 type: Number,
//		 min: 2000,
//		 max: 2099,
//		 listable: true
//	 },
//	 quarter: {
//		 type: String,
//		 allowedValues: ['C1', 'C2', 'Annual'],
//		 listable: true
//	 },
//	 open: {
//		 type: Boolean,
//		 defaultValue: true,
//		 listable: true
//	 },
//	 students: {
//		 type: [Student],
//		 defaultValue: []
//	 }
// })


export class Subject extends DomainModel({
	code: {
		type: String,
		unique: true,
		min: 2,
		listable: true
	},
	name: {
		type: String,
		min: 2,
		listable: true
	},
	courses: {
		type: [Object],
		defaultValue: []
	}
}){
	get actions() { return {
		openCourse: function() { Router.go(`/subjects/${this.code}/courses/__new__`) },
		edit: function() { Router.go(`/subjects/${this.code}/edit`) },
		delete: function() {
			Subjects.remove(this._id, {tx: true, instant: true, callback: (error) => {
				if (error) Alert.error(`Operation could not be performed. Cause: ${error}`)
				else Alert.success('The element was successfully deleted.', true)
			}})
		}
	}}
}

export const Subjects = Subject.createCollection('subjects')