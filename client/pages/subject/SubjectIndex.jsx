import Subject from '/lib/model/Subject.js'
import React from 'react'

const {__} = TAPi18n

// Template.SubjectIndex.helpers({
// 	tableSettings() { return {
// 		elementClass: Subject,
// 		onRowClick: function(subject) {
// 			Router.go('subject.show', subject)
// 		}
// 	}},
// 	actions() { return {
// 		actions: { add() { Router.go('subject.insert') } }
// 	}}
// })

// function Wrapped(Component) {
//     return React.createClass({
//         render: function() {
//             return ( 
//                 <div className="wrapper"> 
//                     before 
//                     <Component {...this.props}/>
//                     after
//                 </div>
//             );
//         }    
//     });
// };

// var Hello = React.createClass({
//     render: function() {
//         return <div>Hello {this.props.name}</div>;
//     }
// });

// var WrappedHello = Wrapped(Hello);


import ActionBar from '/client/components/actionBar/ActionBar.jsx'

export default ({subjects}) =>
	<div className='element'>
		<div className='header'>
			<h1> {__('subjects')} </h1>
			{ <ActionBar actions={[{key: 'add', callback: ()=> console.log("YEAH!") }]} /> }
		</div>		
		<div className='content'>
			<table>
				<tr><th>Code</th><th>Name</th></tr>
				{subjects.map((s) => <tr><td>{s.code}</td><td>{s.name}</td></tr>)}
			</table>
		</div>
	</div>