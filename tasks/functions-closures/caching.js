"use strict";
function createCachable(func) {
    
    var keeper = createKeeper();
    
    return function() {
        if(keeper.get(arguments[0]) === null){ 
    	   keeper.put(arguments[0],func(arguments[0]));
        }  
        return keeper.get(arguments[0])
  }
}

function createKeeper() {
  
    var arrKey = [];
    var arrValue = [];
      
    function checkUhique(element){
          
        for(var i = 0; i < arrKey.length; i++){
            if(arrKey[i] === element){
                return i
            }
        }
        return true
    }
      
    return {
        put : function (key,value){
              
            var uniqueIndex = checkUhique(key);
              
            if(uniqueIndex){
                arrKey.push(key);
                arrValue.push(value);            
            }else{
                arrValue[uniqueIndex] = value;
            }
        },
          
        get : function (key){
          
            var getValByKey = arrValue[arrKey.indexOf(key)];
              
            if(getValByKey === undefined){
                return null
            }
            return getValByKey;
        }
    };
}