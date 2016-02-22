Template.alertPanel.events({
	'click .alertPanel [action="undo"]': function (event) {
		event.preventDefault()
		tx.undo()
		sAlert.close(this._id)
	}
})

Alert = {
	info: (message, undoable = false) => sAlert.info(message, {undoable: true}),
	success: (message, undoable = false) => sAlert.success(message, {undoable: true}),
	warning: (message, undoable = false) => sAlert.warning(message, {undoable: true}),
	error: (message, undoable = false) => sAlert.error(message, {undoable: true})
}