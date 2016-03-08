const {OneOf, Optional} = Match

SimpleSchema.debug = false
SimpleSchema.extendOptions({
	domainType: Optional(OneOf(Array, Function)),
	listable: Optional(Boolean)
})