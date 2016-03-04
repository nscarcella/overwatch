import DomainModel from './DomainModel.js'
import EvaluationInstance from './EvaluationInstance.js'

export default DomainModel({
	firstName: { type: String, min: 2 },
	lastName: { type: String, min: 2 },
	idNumber: { type: String, regEx: /^[0-9]+$/, unique: true, sparse: true },
	approvalStatus: { type: String, allowedValues: ['Coursing', 'Can be Signed', 'Signed', 'Quitted'], defaultValue: 'Coursing' },
	legalStatus: { type: String, allowedValues: ['Enrolled', 'Auditing'] },
	teacherCandidate: { type: Boolean, defaultValue: false },
	evaluationInstances: { type: [EvaluationInstance], defaultValue: [] }
})