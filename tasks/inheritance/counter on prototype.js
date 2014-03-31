'use strict'
var count;
var protoCounter = {
	inc: function(num) {
		var numInt = parseInt(num,10);
		if(!!numInt){
			return count += numInt
		}
		return ++count;
	},

	dec: function(num) {
		var numInt = parseInt(num,10);
		if(!!numInt){
			return count -= numInt
		}
		return --count;
	},

	get: function() {
		return count
	}
}

function Counter(initialValue) {
	count = parseInt(initialValue,10);
	if(!count){
		count = 0;
	}
}

Counter.prototype = protoCounter;
var instanceCount = new Counter();