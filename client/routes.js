Router.configure({
	layoutTemplate: 'layout'
})

Router.onRun(function() {
	Alert.flush()
	this.next()
})

Router.route('/', function(){this.redirect('subjects')})

Router.route('/subjects')

Router.route('/subjects/__new__', {template: 'subject.edit', data: function() { return {} } } )
Router.route('/subjects/:code', {template: 'subject', data: function() { return Subjects.findOne({code: this.params.code}) } } )
Router.route('/subjects/:code/edit', {template: 'subject.edit', data: function() { return Subjects.findOne({code: this.params.code}) } } )