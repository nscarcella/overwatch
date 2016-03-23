import DomainModel from './DomainModel.js'
import EvaluationInstance from './EvaluationInstance.js'

export default class Student extends DomainModel({
	idNumber: { type: String, regEx: /^[0-9]+$/, unique: true, sparse: true, listable: true },
	firstName: { type: String, min: 2, listable: true },
	lastName: { type: String, min: 2, listable: true },
	approvalStatus: { type: String, listable: true, allowedValues: ['Coursing', 'Can be Signed', 'Signed', 'Quitted'], defaultValue: 'Coursing' },
	legalStatus: { type: String, listable: true, allowedValues: ['Enrolled', 'Auditing'], defaultValue: 'Enrolled'},
	teacherCandidate: { type: Boolean, defaultValue: false },
	_courseId: { type: String, regEx: SimpleSchema.RegEx.Id }
}){
	
}