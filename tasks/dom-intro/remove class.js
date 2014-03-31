'use strict'
function removeClass(node, classToRemove) {
    
	var arr = node.className.split(" ");
	var resultArr = [];
    
    for(var i = 0; i < arr.length; i++){
        if (arr[i] !== classToRemove){
            resultArr.push(arr[i]);
        }        
    }
      node.className = resultArr.join(' ');
}