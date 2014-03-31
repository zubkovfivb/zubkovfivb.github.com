function extractOddItems(arr) {
    
    var result = [];
    
    for(x in arr){
        if(parseInt(x, 10)){
	       if(x%2 !==0){
	           result.push(arr[x]);     
	       } 	       
	   }    
	}  
    return result;
}