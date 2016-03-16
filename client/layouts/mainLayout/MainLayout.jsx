import React from 'react'
const {__} = TAPi18n

export default ({content}) =>
	<div className='mainLayout'>
		<header>
			<img className='logo' src="/logo.png"/>
			<h1> {__('title')} </h1>
		</header>
		<div className='container'>
			{content}
		</div>
	</div>