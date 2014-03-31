"use strict"; 
function getUnique(arr) {

    var uniqueArr = [];
    
    function ifUnique(elem){
        if(Array.prototype.indexOf.call(uniqueArr,elem) === -1){
            uniqueArr.push(elem);
        }
    }
    
    Array.prototype.forEach.call(arr,ifUnique);
    return uniqueArr
}