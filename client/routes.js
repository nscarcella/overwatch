import Subject from '/lib/model/Subject.js'

Router.configure({
	layoutTemplate: 'layout'
})

Router.onRun(function() {
	Alert.flush()
	this.next()
})

Router.route('/', function(){this.redirect('subjects')})

Router.route('/subjects', { data: { collection: Subject.collection() } })

Router.route('/subjects/__new__', {template: 'subject.edit', data: { collection: Subject.collection(), target: {} } } )
Router.route('/subjects/:code', {template: 'subject', data: function() { return Subject.collection().findOne({code: this.params.code}) } } )
Router.route('/subjects/:code/edit', {template: 'subject.edit', data: function(){ return {
	collection: Subject.collection(),
	target: Subject.collection().findOne({code: this.params.code})
}}})