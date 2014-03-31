'use strict'
function next(node) {
    while(node.nextSibling!= null){
        if((node = node.nextSibling).nodeType === 1){
            return node  
        }
    }
    return null
}