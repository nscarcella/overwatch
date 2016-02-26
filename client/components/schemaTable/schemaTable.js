Template.schemaTable.helpers({
	innerTableSettings : function() {

		const actions = this.settings.actions || []
		const collection = this.settings.collection
		const schema = this.settings.schema || collection.simpleSchema()
		const listableFields = schema.objectKeys().filter(key => schema._schema[key].listable)

		return Object.assign({showRowCount: true, noDataTmpl: Template.emptySchemaTable}, this.settings, {
			collection: collection.find({}, {transform: doc => collection._transform(Object.assign(doc, {actions: actions})) }),
			fields: [...listableFields, { 'label': "Actions", tmpl: Template.actionsCell} ]
		})
	}
})

Template.schemaTable.events({
	'click .reactive-table tbody tr': function(event) {
    const action = event.target.getAttribute('action')
    if(action) {
    	this[action]()
    	event.stopPropagation()
    }
	}
})