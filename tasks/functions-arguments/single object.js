function extend() {
    
    var result = {};
    
    for(var i = 0; i < arguments.length; i++){
        for(key in arguments[i]){
            result[key] = arguments[i][key]; 
        }
    }
   return result;
}