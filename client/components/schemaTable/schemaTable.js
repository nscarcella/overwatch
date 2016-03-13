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
			fields: [...listableFields, {'label': 'Actions', tmpl: Template.actionBar, sortable: false } ]
		}, this.settings)
	}
})

Template.schemaTable.events({
	'click .reactive-table tbody tr': function(event, template) {
    const action = template.data.settings.onRowClick || (() =>  null)
    action(this)
  	event.stopPropagation()
	}
})