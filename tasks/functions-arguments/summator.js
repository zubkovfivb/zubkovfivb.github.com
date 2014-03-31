function summ() {
    var result = 0;
    
    for(var i = 0; i < arguments.length; i++){
        if(typeof arguments[i] !== 'object'){
            result += checkElem(result, arguments[i]);;
        }else if(Array.isArray(arguments[i])){
            for( var j = 0; j < arguments[i].length; j++){
                result += checkElem(result, arguments[i][j]);
            }         
        }    
    }
    return result;
}

function checkElem(result, element){ 
    if(!isNaN(parseFloat(element, 10)) && element != undefined){ 
        result = parseFloat(element, 10);
        return result; 
    }
    return 0;
}