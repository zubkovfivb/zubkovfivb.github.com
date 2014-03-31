function every(arr, func) {
    for(var i = 0; i < arr.length; i += 1 ){
		if(!func(arr[i],i,arr)){        
			return false;
		}
	}
	return true;
}