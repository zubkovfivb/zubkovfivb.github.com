function contains(where, what) {
    
    if(Array.isArray(where) && Array.isArray(what)){ 
        
        top:    
        for(var i = 0; i < what.length; i++){
            
            alt:
            for(var j = 0; j < where.length; j++){
            
                if (what[i] === where[j]){  
                    continue top;
                }else{
                    continue alt;  
                }                  
            }             
            return false;      
        }           
        return true;
    }
}