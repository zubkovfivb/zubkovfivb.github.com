
createExpand(document.querySelector('.expander'));

function createExpand(domElement){
    var arr = [];
    domElement.addEventListener('click', hendler, false);    
    function hendler(event){ 
        if(event.target.className === 'sort'){
            sortNode(event.target.parentNode);
        }
        if(event.target.className === 'closer'){
            delNode(event.target.parentNode);
        }
        if(event.target.className === 'expand'){  
            
            if(event.target.parentNode.children[1] && event.target.parentNode.children[1].style.display === 'block'){ 
                hideNode(event.target.nextSibling);   
            }else{             
                shownode(event.target.nextSibling);     
            }       
        }  
    }
    
    function sortNode(node){
        
        var parent = node.parentNode;
        
        for(var i = 1; i < parent.children.length; i++){
            var htmlInDiv = parent.children[i].innerHTML;           
            arr[i-1] = htmlInDiv.slice(0,htmlInDiv.indexOf('\n')); 
            parent.children[i].innerHTML = htmlInDiv.substring(htmlInDiv.indexOf('\n'));            
        }
        arr.sort();
        for(var i = 1; i < parent.children.length; i++){          
            var htmlInDiv = parent.children[i].innerHTML; 
            parent.children[i].innerHTML = arr[i-1] + htmlInDiv; 
               
        }
        
    }
    
    function delNode(node){
        
        var parent = node.parentNode;
        parent.removeChild(node);
    }
    
    function shownode(node){
        
        if(!node){           
            return        
        }        
        if(node.className === 'node'){              
            node.style.display = 'block';                     
        }                
        shownode(node.nextSibling);    
    } 
       
    function hideNode(node){
        
        if(!node){            
            return        
        }        
        if(node.className === 'node'){               
            node.style.display = 'none';                     
        }                
            hideNode(node.nextSibling);    
    }
}