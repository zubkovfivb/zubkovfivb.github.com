function toMatrix(data, rowSize) {
        
    var result = [];
    
    if(Array.isArray(data) && rowSize > 0){
        for(var i = 0; i < data.length; i += rowSize ){    
            result[i/rowSize]= data.slice(i, (i + rowSize));
        }         
        return result;
    }                          
}