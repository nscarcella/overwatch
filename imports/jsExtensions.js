Array.prototype.includes = function(elem){return this.indexOf(elem) >= 0}
Array.prototype.empty = function(){return this.length === 0}
Array.prototype.equals = function(other) {
	if(this.length !== other.length) return false
	this.forEach((elem, index) => { if(other[index] !== elem) return false })
	return true
}