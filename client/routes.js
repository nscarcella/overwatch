Router.configure({
	layoutTemplate: 'layout'
})

Router.route('/', {template: 'subjects'})
Router.route('/subjects')
Router.route('/subjects/:code', {template: 'subject', data: function() { return Subjects.findOne({code: this.params.code}) } } )