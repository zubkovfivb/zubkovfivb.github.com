"use strict";
function createSummator(initialValue) {
    
    var count = parseInt(initialValue,10);
    
	if(!count){
        count = 0;
    }	
     
    return {
    
        inc: function(num) {
            
            var numInt = parseInt(num,10);
        
    	    if(!!numInt){
                return count += numInt
            }
        
            return ++count;
        },
  
        dec: function(num) {
        
            var numInt = parseInt(num,10);
          
            if(!!numInt){
                return count -= numInt
            }
        
            return --count;
        },
 
        get: function() {
            return count 
        }    
    };
}