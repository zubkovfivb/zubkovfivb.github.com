'use strict'
function hasClass(node, classToCheck) {
    
	var arr = node.className.split(" ");
     
    for(var i = 0; i < arr.length; i++){
        if (arr[i] === classToCheck){
            return true
        }           
    }
}