function parse(queryString) {
    
    var mass = queryString.split('&');
    var mass2;
    var obj ={};
    
    if(queryString !== ''){
        for(var i = 0; i < mass.length; i++){
            mass2 = mass[i].split('=');
            if(parseInt(mass2[1], 10) ){
                mass2[1] = parseInt(mass2[1], 10)
            }
            if(mass2[1] === 'false') {
                mass2[1] = false;
            } else if(mass2[1] === 'true'){
                mass2[1] = true;
            }
            obj[mass2[0]]= mass2[1];
            }
    }
	return obj
}