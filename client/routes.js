import Subject from '/lib/model/Subject.js'

Router.configure({
	layoutTemplate: 'layout'
})

Router.onRun(function() {
	Alert.flush()
	this.next()
})

Router.route('/', function(){ this.redirect('subject.index') })

Router.route('/subjects', { name: 'subject.index',  data() { return {
	collection: Subject.collection()
}}})
Router.route('/subjects/__new__', { name: 'subject.insert', template: 'SubjectEdit', data() { return {
	collection: Subject.collection(),
	target: new Subject()
}}})
Router.route('/subjects/:code', { name: 'subject.show', data() { return {
	target: Subject.collection().findOne({code: this.params.code}),
	bleh: Object.keys(this.params)
}}})
Router.route('/subjects/:code/edit', { name: 'subject.update', template: 'SubjectEdit', data() { return {
	collection: Subject.collection(),
	target: Subject.collection().findOne({code: this.params.code})
}}})