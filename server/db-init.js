const shouldRun = false

Meteor.startup(() => {
	if(shouldRun) {
		console.log('Initing DBs')
		
		Subjects.remove({}, () => {
			Subjects.insert({name: 'Materia 01', code: 'M01'})
			Subjects.insert({name: 'Materia 02', code: 'M02'})
			Subjects.insert({name: 'Materia 03', code: 'M03'})
			Subjects.insert({name: 'Materia 04', code: 'M04'})
			Subjects.insert({name: 'Materia 05', code: 'M05'})
			Subjects.insert({name: 'Materia 06', code: 'M06'})
			Subjects.insert({name: 'Materia 07', code: 'M07'})
			Subjects.insert({name: 'Materia 08', code: 'M08'})
			Subjects.insert({name: 'Materia 09', code: 'M09'})
			Subjects.insert({name: 'Materia 10', code: 'M10'})
			Subjects.insert({name: 'Materia 11', code: 'M11'})
			Subjects.insert({name: 'Materia 12', code: 'M12'})
			Subjects.insert({name: 'Materia 13', code: 'M13'})
			Subjects.insert({name: 'Materia 14', code: 'M14'})
			Subjects.insert({name: 'Materia 15', code: 'M15'})
			Subjects.insert({name: 'Materia 16', code: 'M16'})
			Subjects.insert({name: 'Materia 17', code: 'M17'})
			Subjects.insert({name: 'Materia 18', code: 'M18'})
			Subjects.insert({name: 'Materia 19', code: 'M19'})
			Subjects.insert({name: 'Materia 20', code: 'M20'})
		})
	}
})