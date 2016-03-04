Template.element.helpers({
	actionKeys() { return typeof this.actions === 'string' ? this.actions.split(' ') : this.actions }
})