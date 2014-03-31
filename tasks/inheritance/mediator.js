'use strict'
function createMediator () {

    var arrName = [];
    var arrHandler = [];
    
    function getIndexName(eventName){
        for(var i = 0; i < arrName.length; i++){
            if(eventName === arrName[i]){
                return i
            }
        }
        return (-1)       
    }
    
    return {
        subscribe: function(eventName, handler){
            
            var index = getIndexName(eventName);
            
            if(index !== (-1)){
                arrHandler[index].push(handler);
            }else{
                arrName.push(eventName);
                var arr = [];
                arr.push(handler);
                arrHandler.push(arr);
            }
        },
        
        publish: function(eventName, data){
            
           var index = getIndexName(eventName);
           
            if(index !== (-1)){
                for(var i = 0; i < arrHandler[index].length; i++){
                    arrHandler[index][i](data);
                }    
            }            

        },
        
        unsubscribe: function(eventName, handler){
            
           var index = getIndexName(eventName);
           
            if(index !== (-1)){
                arrName.splice(index, 1);
                arrHandler.splice(index,1);
            }
        }
    }
}