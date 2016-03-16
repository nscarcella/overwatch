if(Meteor.isClient) {

	Meteor.startup(() => {
		TAPi18n.setLanguage('es')

		Template.registerHelper('_', function(arg){
			console.log("translating:" +arg)
			x = TAPi18n.__(arg,null,'es')
			console.log(x)
			return x
		})
	})
}