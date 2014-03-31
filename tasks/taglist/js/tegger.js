function CreateTagList(getnode, arrList){
    
    
    var tagArr = arrList || [];     

    var widget = document.createElement('div');
        widget.className = 'widget';

    var buttons = document.createElement('div');
        buttons.className = 'buttons';

    var btnView = document.createElement('input');
        btnView.type = 'button'
        btnView.className = 'btnView';
        btnView.value = 'View';
        addEvent(btnView, 'click', changToViewMode);
        
    var btnEdit = document.createElement('input');
        btnEdit.type = 'button'
        btnEdit.className = 'btnEdit';
        btnEdit.value = 'Edit';
        addEvent(btnEdit, 'click', changToEditMode);
        
    var inputField = document.createElement('div');
        inputField.className = 'inputField';
    
    var inputText = document.createElement('input');
        inputText.type = 'text'
        inputText.className = 'inputText';
        inputText.maxLength = '40';
        
    var buttonAdd = document.createElement('input');
        buttonAdd.type = 'button';
        buttonAdd.className = 'buttonAdd';
        buttonAdd.value = 'Add';
        addEvent(buttonAdd, 'click', addTag);
        
    var taglist = document.createElement('div');
        taglist.className = 'taglist';
        taglist.innerHTML = '';
        addEvent(taglist, 'click', deleteTag);
        
        
    function addEvent(element, type, handler){
    
     
        if (document.addEventListener) { 
            element.addEventListener(type, handler, false);
        } else {
            element.attachEvent("on" + type, handler);
        }
    }   
 
 
     function removeEvent(element, type, handler){
    
     
        if (document.addEventListener) { 
            element.removeEventListener(type, handler, false);
        } else {
            element.detachEvent("on" + type, handler);
        }
    } 
       

    function addTagList(){
        
        
        for(var i = 0; i < tagArr.length; i++){
            var tag = document.createElement('div');
                tag.className = 'tag';
            var text = document.createElement('span');
                text.innerHTML = tagArr[i];
                   
            tag.appendChild(text);          
            taglist.appendChild(tag);
        }
        resize ();
    }
    
    
    function addTag(){
    
    
        if(cheackForDuplicate()){
            var tag = document.createElement('div');
                tag.className = 'tag';
            var text = document.createElement('span');
                text.innerHTML = inputText.value;
            var tagDel = document.createElement('div');
                tagDel.innerHTML = 'x';
                tagDel.className = 'tagDel';
                   
            inputText.value = '';
            tag.appendChild(text);
            tag.appendChild(tagDel);           
            taglist.appendChild(tag);
            resize (); 
            }
    }
    
    
    function cheackForDuplicate(){
        
        if(inputText.value != ''){
            for(var i = 0; i < tagArr.length; i++){
                if(tagArr[i] == inputText.value){
                    return false        
                }
            }
            tagArr.push(inputText.value);
            return true
        }
    }
    
    
    function deleteTag(event){
        event = event || window.event;
        var target = event.target || event.srcElement;
    
        if(target.className === 'tagDel'){
            var currentTag = target.parentNode;
            
            for(var i = 0; i < tagArr.length ; i++){
                if(tagArr[i] === currentTag.children[0].innerHTML){
                   tagArr.splice(i,1); 
                }
            }
            taglist.removeChild(currentTag);
            resize ();
            }
    }
    
    
    function createWidget(){
        
        
        widget.appendChild(taglist);
        buttons.appendChild(btnEdit); 
        widget.appendChild(buttons);        
        getnode.appendChild(widget);
    }
    
    
    function changToViewMode(){
        
        
        removeEvent(widget, 'keypress', checkEnterPressed);
        buttons.removeChild(btnView);
        buttons.appendChild(btnEdit);
        inputField.removeChild(inputText);
        inputField.removeChild(buttonAdd);
        widget.removeChild(inputField);
        
        var allTag = taglist.querySelectorAll('.tag');
        var remover = taglist.querySelectorAll('.tagDel');
        for(var i = 0; i < allTag.length; i++ ){
            allTag[i].removeChild(remover[i]);
        }
        resize ();
    }
    
    
    function checkEnterPressed(e){
        e = e || window.event;
        
        if(e.keyCode === 13){
            addTag();   
        }       
    }
    
    
    function changToEditMode(){
        
        
        addEvent(widget, 'keypress', checkEnterPressed);
        buttons.removeChild(btnEdit);    
        buttons.appendChild(btnView);
        inputField.appendChild(inputText);
        inputField.appendChild(buttonAdd);
        widget.appendChild(inputField);
        
        var allTag = taglist.querySelectorAll('.tag');
        for(var i = 0; i < allTag.length; i++ ){
            var tagDel = document.createElement('div');
                tagDel.innerHTML = 'x';
                tagDel.className = 'tagDel';
            allTag[i].appendChild(tagDel);
        } 
        resize ();       
    }
    
    
    function resize () {
        if((firstTag = taglist.firstChild) && (lastTag = taglist.lastChild)){
         taglist.style.height = lastTag.offsetTop - firstTag.offsetTop + 30 + 'px';     
        }      
    }  
    
    
    this.getTagList = function(){
        
        
        return tagArr;
    }  
      
    createWidget(); 
    addTagList();      
}

var tl = new CreateTagList(document.querySelector('.container-tegger'), ['first','second','third','fourth']);