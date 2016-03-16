// Template.actionBar.helpers({
// 	actionEntries() {
// 		return Object.keys(this.actions || {}).map(k => ({key: k, callback: this.actions[k].bind(this) }))
// 	}
// })

// Template.actionBar.events({
// 	'click [data-action]': function(event, template) {
//   	event.stopPropagation()
//     this.callback()
// 	}
// })
import React from 'react'

export default ({actions}) =>
	<div className='actionBar'>
		{actions.map(({key, callback}) =>
			<i className={`action ${key}`} data-action={key} title={key} onClick={callback}/>
		)}
	</div>