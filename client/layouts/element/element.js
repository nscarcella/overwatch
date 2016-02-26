Template.element.helpers({
	actionList() { return typeof this.actions === 'string' ? this.actions.split(' ') : this.actions }
})
