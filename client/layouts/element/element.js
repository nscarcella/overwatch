Template.element.helpers({
	actionKeys() {
		return typeof this.actions === 'string'
			? this.actions.split(' ')
			: this.target ? Object.keys(this.target.actions) : this.actions
	}
})