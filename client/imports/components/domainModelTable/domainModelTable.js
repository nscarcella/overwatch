import {njsx, div} from '/client/reactNJSX.js'
import {Table, Tr, Td, unsafe} from 'reactable'
import actionBar from '/client/imports/components/actionBar/actionBar.js'

const {__} = TAPi18n
const table = njsx(Table)
const tr = njsx(Tr)
const td = njsx(Td)

const DomainModelTable = ({domainClass, itemsPerPage = 10, pageButtonLimit = 10, onRowClick = ()=>{}, data = []}) => {
	const listableFields = domainClass.schema.objectKeys().filter(key => domainClass.schema.schema(key).listable)
	return div('.domainModelTable')(
		table({
			columns: [
				...listableFields.map(field => ( { key: field, label: __(`${domainClass.name}.${field}`) } )),
				{key: 'actions', label: __('domainModelTable.actions')}
			],
			itemsPerPage,
			pageButtonLimit,
			sortable: listableFields,
			filterable: listableFields,
			noDataText: __('domainModelTable.noData'),
			nextPageLabel: __('domainModelTable.next'),
			previousPageLabel: __('domainModelTable.previous'),
			filterPlaceholder: __('domainModelTable.filter')
		})(
			data.map(element =>
				tr([
					...listableFields.map(field => td({column: field, handleClick: () => onRowClick(element) })([ unsafe(element[field]) ])),
					td({column: 'actions'})(actionBar({actions: element.actions}))
				])
			)
		)
	)()
}

export default njsx(DomainModelTable)