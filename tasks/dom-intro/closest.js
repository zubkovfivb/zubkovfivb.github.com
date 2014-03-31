'use strict'
function closest(node, testFunc) {
	if(testFunc(node)){
		return node
	}
  
  while(node.parentNode){
		if(testFunc(node = node.parentNode)){
    	return node
		}
	}
  return null
}