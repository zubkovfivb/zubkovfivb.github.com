'use strict'
function makeIterable(func){

    var resultToArray = [];

    return function(){
    
        for(var i = 0; i < arguments.length ; i++){
            resultToArray.push(func(arguments[i]));
        } 
        
        return resultToArray
    }
}