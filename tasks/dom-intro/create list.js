'use strict'
function createList(listData, listContainer, itemContainer){

    var resultList = document.createElement(listContainer || 'ul');
   
    function createHierarchy(arrData,parrentNode){
        for(var i = 0; i < arrData.length; i++){
            if(Array.isArray(arrData[i])){
                var subParrentNode = document.createElement(listContainer || 'ul');
                parrentNode.appendChild(subParrentNode) ;
                createHierarchy(arrData[i],subParrentNode);    
            }else{
                var childNode = document.createElement(itemContainer || 'li');
                var textNode = document.createTextNode(arrData[i]);
                childNode.appendChild(textNode);
                parrentNode.appendChild(childNode) ;
            }        
        }
    }
      
    createHierarchy(listData,resultList);
    return resultList
}