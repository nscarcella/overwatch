Template.schemaTable.helpers({
	innerTableSettings : function() {
		const schema = this.settings.schema || this.settings.collection.simpleSchema()
		const listableFields = this.settings.fields || schema.objectKeys().filter(key => schema._schema[key].listable)

		return Object.assign({
			showRowCount: true,
			rowsPerPage: 5,
			noDataTmpl: Template.emptySchemaTable,
			fields: [...listableFields, {'label': "Actions", tmpl: Template.actionsCell} ]
		}, this.settings)
	}
})

Template.schemaTable.events({
	'click .reactive-table tbody tr': function(event, template) {
    const actionKey = event.target.dataset.action
    const action = actionKey ? this.actions[actionKey] : template.data.settings.onRowClick || () =>  null

    action.bind(this)()
  	event.stopPropagation()
	}
})

Template.actionsCell.helpers({
	actionKeys() { return Object.keys(this.actions) }
})