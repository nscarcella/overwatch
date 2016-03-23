if(Meteor.isClient) {
	AutoForm.setDefaultTemplate('bootstrap3-horizontal')

	AutoForm.addFormType('transactional-insert', {
		onSubmit() {
			this.event.preventDefault()

			if (!this.collection) throw new Error("AutoForm: You must specify a collection when form type is transactional-insert.")
			if (!tx) throw new Error("AutoForm: The meteor-transaction package is needed when form type is transactional-insert.")

			this.runBeforeHooks(this.insertDoc, doc => {
				this.collection.insert(doc, Object.assign({tx: true, instant: true}, this.validationOptions), this.result)
			})
		},
		validateForm() {
			return AutoForm._validateFormDoc(this.formDoc, false, this.form.id, AutoForm.getFormSchema(this.form.id), this.form)
		},
		shouldPrevalidate() {
			return !!this.formAttributes.collection && !!this.formAttributes.schema
		}
	})

	AutoForm.addFormType('transactional-update', {
		onSubmit() {
			this.event.preventDefault()

			if (!this.collection) throw new Error("AutoForm: You must specify a collection when form type is transactional-update.")
			if (!tx) throw new Error("AutoForm: The meteor-transaction package is needed when form type is transactional-update.")

			this.runBeforeHooks(this.updateDoc, modifier => {
				if (_.isEmpty(modifier)) this.result(null, 0)
				else this.collection.update({_id: this.docId}, modifier, Object.assign({tx: true, instant: true}, this.validationOptions), this.result)
			})
		},
		usesModifier: true,
		validateForm() {
			return AutoForm._validateFormDoc(this.formDoc, false, this.form.id, AutoForm.getFormSchema(this.form.id), this.form)
		},
		shouldPrevalidate() {
			return !!this.formAttributes.collection && !!this.formAttributes.schema
		}
	})
}