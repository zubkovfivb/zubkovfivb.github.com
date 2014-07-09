function init(){

	createTodoJS(document.querySelector('.todo-container-JS'));


	function createTodoJS(node){

		var mainCB = node.querySelector('.todo-check-all');
		var allCB = node.querySelectorAll('.todo-check');
		var inputTaskNameField = node.querySelector('.todo-txt-input');	
		var taskList = node.querySelector('.todo-list');
		var deleteSelectedTask = node.querySelector('.todo-button');
		var todoControl = node.querySelector('.todo-control');	
		var todoWarning = node.querySelector('.todo-warning');
		var taskCounter = node.querySelector('#todo-counter');
		var taskCounterCount = taskCounter.children[0];

		var limitLengthTaskName = 25;
		var warningShowTime = 2 * 1000;
		var limitCountTask = 20;
		var splitChar = '%';
		var cookieName = 'todoJS';
		var expiresCookie = 3600;
		var nmbspRegExp = /\S/;
		var warningTimeot;

		loadStorageItem();


		function loadStorageItem(){

			var cookieSave = getCookie(cookieName);
			var saveItem = null;

			if(localStorage && localStorage.todoJS){
				saveItem = localStorage.todoJS.split(splitChar);
			} else if(cookieSave){
				saveItem = cookieSave.split(splitChar);
			}

			if(saveItem){		
				var loadObj = JSON.parse(saveItem);	
				for(var todo in loadObj) {
					createTask(loadObj[todo].todoText, loadObj[todo].cbState);	
				}			
			}
		}


		function getStateCB(){

			var tempArrChecked = [];
			var tempArrUnChecked = [];

			for(var i = 0; i < allCB.length; i++){
				if(allCB[i].checked){
					tempArrChecked.push(allCB[i]);
				}else{
					tempArrUnChecked.push(allCB[i]);
				}				
			}
			return {"checkedCB":tempArrChecked, 
					"unCheckedCB":tempArrUnChecked}
		}


		function updateCBState(){

			allCB = node.querySelectorAll('.todo-check');
			var unCheckedCB = getStateCB().unCheckedCB;
			var checkedCB = getStateCB().checkedCB;

				if(unCheckedCB.length || !checkedCB.length){
					mainCB.checked = false;
				}else{
					mainCB.checked = true;
				}

				if(taskList.children.length){
					todoControl.style.display = 'block';
					taskList.style.display = 'block';
				}else{
					todoControl.style.display = 'none';	
					taskList.style.display = 'none';			
				}

				if(checkedCB.length){
					deleteSelectedTask.style.display = 'inline-block';
				}else{
					deleteSelectedTask.style.display = 'none';
				}

			taskCounterCount.innerHTML = unCheckedCB.length;	
			deleteSelectedTask.innerHTML = 'Clear '+ checkedCB.length +' completed items';
			storageTodos();
		}


		function storageTodos(){

			var storeObj = {};
			var allTodos = node.querySelectorAll('.todo-one-todo');

			for(var i = 0; i < allTodos.length; i++){
				var oneStorageTodo = {};
				oneStorageTodo.cbState = allTodos[i].querySelector('.todo-check').checked;
				oneStorageTodo.todoText = allTodos[i].querySelector('.todo-one-todo-text').innerHTML;
				storeObj["todo" + i] = oneStorageTodo;		
			}
			var storeString = JSON.stringify(storeObj);

			setToLocalStorage(storeString);	
			setCookie(storeString)
		}


		function serchNmbsp(str){

    		var serchSimbol = str.search(nmbspRegExp);

			if(serchSimbol === (-1)){
				return false
			}
    		return true
		}


		function setToLocalStorage(qString){

			if(localStorage){
				localStorage.todoJS = qString;		
			}		
		}


		function getCookie(name) {

  			var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));

  			return matches ? decodeURIComponent(matches[1]) : undefined;
		}


		function setCookie(qString) {

	    	var dataCookie = new Date();

	    	dataCookie.setTime(dataCookie.getTime() + expiresCookie*1000);
	    	expiresCookie  = dataCookie.toUTCString();	 
	    	qString = encodeURIComponent(qString);
	 
	    	var updatedCookie = cookieName + "=" + qString + ";expires" + "=" + expiresCookie;

  			document.cookie = updatedCookie;
		}


		function createTask(todoText, state){

			if(allCB.length < limitCountTask){
				todoWarning.innerHTML = '';
				var oneTask = document.createElement('div');
					oneTask.className = "todo-one-todo";

					oneTask.onmouseover = function(){

						var delTodo = oneTask.children[2];
						delTodo.style.display = 'block';
      				}

					oneTask.onmouseout = function(){

						var delTodo = oneTask.children[2];
						delTodo.style.display = 'none';
      				}

					oneTask.ondblclick = function(event){

						event = event || window.event;
						var target = event.target || event.srcElement;

						if(target.className !== 'todo-check'){
      						var self = this;     			
      						var textTodo = this.children[1];
      						var textInTodo = textTodo.innerHTML;


      						function saveTaskValue(newText){

      							todoWarning.innerHTML = '';
      							var correctValue = newText.substr(0, limitLengthTaskName);
								textTodo.innerHTML = correctValue;

								if(correctValue && serchNmbsp(correctValue)){
									self.insertBefore(textTodo, self.children[2]);
									self.removeChild(inputField);	
								}else{
									taskList.removeChild(self);					
								}

								updateCBState();
							}

      						if(textInTodo){	

  								var inputField = document.createElement('input');		
									inputField.className = "todo-change-input";
									inputField.type = "text";
									inputField.maxLength = 25;
									inputField.value = textInTodo;

									inputField.onblur = function(){
										saveTaskValue(this.value);
									}

									inputField.onkeypress = function(event){

										event = event || window.event;

										if(event.keyCode === 13){
											saveTaskValue(this.value);
										}
									}

									inputField.onkeyup = function(event){

										event = event || window.event;
										var inputTaskNameFieldVal = this.value;

										if(inputTaskNameFieldVal.length >= limitLengthTaskName){
											todoWarning.innerHTML ='Maximum length of task name: ' + limitLengthTaskName;
										}else{
											todoWarning.innerHTML = '';
										}
									}

								self.removeChild(textTodo); 
								self.insertBefore(inputField, self.children[1]);
								inputField.focus();		
							}	   				
      					}
		 			}
				
				var oneTaskCB = document.createElement('input');		
					oneTaskCB.className = "todo-check";
					oneTaskCB.type = "checkbox";
					oneTaskCB.checked = state;
				oneTask.appendChild(oneTaskCB);

				var oneTaskText = document.createElement('div');		
					oneTaskText.className = "todo-one-todo-text";
					oneTaskText.innerHTML = todoText;
				oneTask.appendChild(oneTaskText);

				var oneTaskDelButton = document.createElement('div');		
					oneTaskDelButton.className = "todo-delete-one-todo";
					oneTaskDelButton.innerHTML = "x";
				oneTask.appendChild(oneTaskDelButton);

				if(taskList.children.length === 0){
					taskList.appendChild(oneTask);
				}else{
					// console.log(taskList.children.length)
					taskList.insertBefore(oneTask, taskList.children[0]);
				}
				
				updateCBState();

			}else{
				todoWarning.innerHTML = 'You may add ' + limitCountTask + ' tasks only';	
				clearInterval(warningTimeot);

				warningTimeot = setTimeout(function(){
					todoWarning.innerHTML = '';
				}, warningShowTime)	
			}
		}


		inputTaskNameField.onkeydown = function(event){

			event = event || window.event;

    		if(event.keyCode === 13){
    			var inputTaskNameFieldVal = this.value;
    			var correctValue = inputTaskNameFieldVal.substr(0, limitLengthTaskName);	

				if(correctValue && serchNmbsp(correctValue)){					
					createTask(correctValue);				
				}   

				inputTaskNameField.value = '';	
    		}
		}

		inputTaskNameField.onkeyup = function(event){

			event = event || window.event;
			var inputTaskNameFieldVal = this.value;

			if(inputTaskNameFieldVal.length >= limitLengthTaskName){
				todoWarning.innerHTML ='Maximum length of task name: ' + limitLengthTaskName;
			}else if(event.keyCode !== 13){
				todoWarning.innerHTML = '';
			}
		}

		mainCB.onclick = function() { 

			var stateAll = this.checked; 

			for(var i = 0; i < allCB.length; i++){
				allCB[i].checked = stateAll;				
			}    

			updateCBState();
		}


		deleteSelectedTask.onclick = function() {

    		var allCheckedCB = getStateCB().checkedCB;
    		
    		if(allCheckedCB){
    			for(var i = 0; i < allCheckedCB.length; i++){
    				var oneTask = allCheckedCB[i].parentNode;
    				taskList.removeChild(oneTask);
    			}
    		}   
    		updateCBState();	
		}


		taskList.onclick = function(event) {

			event = event || window.event;
			var target = event.target || event.srcElement;

			if(target.className === 'todo-check'){
				updateCBState();
			}
		
			if(target.className === 'todo-delete-one-todo'){
		   		var oneTask = target.parentNode;
		    	taskList.removeChild(oneTask);
		    	updateCBState();
			}				
		}
	}
}
init();