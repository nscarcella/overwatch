const {isArray} = Array

Template.schemaTable.helpers({
	innerTableSettings : function() {
		const elementClass = this.elementClass || this.settings.elementClass
		const collection = this.collection || this.settings.collection
		const schema = this.settings.schema || collection.simpleSchema && collection.simpleSchema() || elementClass.schema
		const listableFields = this.settings.fields || schema.objectKeys().filter(key => schema._schema[key].listable)

		return Object.assign({
			showRowCount: true,
			rowsPerPage: 5,
			collection: isArray(collection) ? elementClass.createCollection(null, collection) : collection,
			noDataTmpl: Template.emptySchemaTable,
			fields: [...listableFields, {'label': 'Actions', fn: (v,o) => {
				return new Spacebars.SafeString(
					Object.keys(new elementClass(o).actions || {}).map(k => `<i class='action ${k}' data-action='${k}' title='${k}'/>`).join('')
				)
			} } ]
		}, this.settings)
	}
})

Template.schemaTable.events({
	'click .reactive-table tbody tr': function(event, template) {
    const actionKey = event.target.dataset.action
    const action = actionKey ? this.actions[actionKey].bind(this) : template.data.settings.onRowClick || (() =>  null)

    action(this)
  	event.stopPropagation()
	}
})