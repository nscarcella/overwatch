import DomainModel from './DomainModel.js'
import Evaluation from './Evaluation.js'

export default DomainModel('EvaluationInstance', {
	evaluation: { type: Evaluation, unique: true, sparse: true },
	calification: { type: Number, min: 2, max: 10 }
})