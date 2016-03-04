import DomainModel from './DomainModel.js'

export default DomainModel({
	name: { type: String, unique: true, min: 2, sparse: true }
})