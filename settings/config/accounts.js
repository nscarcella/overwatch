if(Meteor.isServer){
	ServiceConfiguration.configurations.upsert(
		{ service: "google" },
		{
			$set: {
				loginStyle: "popup",
				clientId: Meteor.settings.accounts.google.id,
				secret: Meteor.settings.accounts.google.secret
			}
		}
	)
}