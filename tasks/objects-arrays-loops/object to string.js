function toQueryString(obj) {
    
    var resultString='';
    
    for(x in obj){
        if(resultString !== ''){
            resultString += '&';
        }
        
        resultString += x + '=' + obj[x] ;        
    }   
	return resultString;
}