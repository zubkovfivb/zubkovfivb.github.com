function createObject(keys, values) {  
    
    if(Array.isArray(keys) && Array.isArray(values)){
        
    var obj = {}; 
    var currentKeys = []; 
           
        for(var j = 0; j < keys.length; j++){
            if(typeof keys[j] === 'string' ){
                currentKeys.push(keys[j]);
            }       
        }   
             
        for(var i = 0; i < currentKeys.length; i++){
            obj[currentKeys[i]] =  values[i];           
        }      
    }   
    return obj;
}