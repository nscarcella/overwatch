Template.alertPanel.events({
	'click .alertPanel [data-action="undo"]': function (event) {
		event.preventDefault()
		tx.undo()
		sAlert.close(this._id)
	}
})

const pendingSessionKey = 'pendingAlerts'

Session.setDefault(pendingSessionKey, [])

Alert = {
	pendingAlertsDelay: 500,
	later: {},
	flush() {
		let delay = 0
		for (const {type, message, undoable} of Session.get(pendingSessionKey))
			setTimeout(()=> Alert[type](message, undoable), delay++ * Alert.pendingAlertsDelay)
		Session.set(pendingSessionKey, [])
	}
}
for(const type of ['info', 'success', 'warning', 'error']) {
	Alert[type] = (message, undoable = false) => sAlert[type](message, {undoable: undoable})
	Alert.later[type] = (message, undoable = false) => Session.set(pendingSessionKey, [...Session.get(pendingSessionKey), {type: type, message: message, undoable: undoable}])
}