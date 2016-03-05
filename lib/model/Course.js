import DomainModel from './DomainModel.js'
import Student from './Student.js'

export default DomainModel('Course', {
	code: { type: String, listable: true },
	year: { type: Number,	min: 2000, max: 2099, listable: true },
	quarter: { type: String, allowedValues: ['C1', 'C2', 'Annual'], listable: true },
	open: { type: Boolean, defaultValue: true, listable: true },
	students: { type: [Student], defaultValue: [] }
})