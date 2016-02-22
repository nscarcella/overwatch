Template.schemaTable.helpers({
	innerTableSettings : function() {

		const actions = this.settings.actions || []
		const collectionSchema = this.settings.collection._c2._simpleSchema
		const listableFields = collectionSchema.objectKeys().filter(key => collectionSchema._schema[key].listable)

		return {
			collection: this.settings.collection.find({}, {transform: doc => this.settings.collection._transform(Object.assign(doc, {actions: this.settings.actions})) }),
			fields: [...listableFields, { key: 'actions', 'label': "Actions", tmpl: Template.actionsCell} ]
		}
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