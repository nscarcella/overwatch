import DomainModel from './DomainModel.js'

export default class Evaluation extends DomainModel({
	name: { type: String, unique: true, min: 2, sparse: true }
}){
	
}