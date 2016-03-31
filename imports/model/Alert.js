import Signal from 'mini-signals'

export default class Alert {
	constructor(type, message, actions = []) {
		this.type = type
		this.message = message
		this.actions = actions
	}
}

Alert.raised = new Signal()

for(const type of ['info', 'success', 'warning', 'error'])
	Alert[type] = (message, ...actions) => Alert.raised.dispatch(new Alert(type,message, actions))