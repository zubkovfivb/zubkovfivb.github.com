'use strict'
function addClass(node, classToAdd) {

    var arr = node.className.split(" ");
    
    for(var i = 0; i < arr.length; i++){
        if (arr[i] === classToAdd){
            return
        }   
    } 
    node.className += " " + classToAdd;
}