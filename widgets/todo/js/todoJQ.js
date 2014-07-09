$( function() {
	
	createTodoJQ($('.todo-container-JQ'));


	function createTodoJQ(node){

		var mainCB = node.find('.todo-check-all');
		var allCB = node.find('.todo-check');
		var taskCounter = node.find('#todo-counter > b');
		var inputTaskNameField = node.find('.todo-txt-input');
		var taskList = node.find('.todo-list');
		var deleteSelectedTask = node.find('.todo-button');
		var todoControl = node.find('.todo-control');
		var oneTask = node.find('.todo-one-todo');
		var todoWarning = node.find('.todo-warning');

		var limitLengthTaskName = 25;
		var warningShowTime = 2 * 1000;
		var limitCountTask = 20;
		var splitChar = '%';
		var cookieName = 'todoJQ';
		var expiresCookie = 3600;
		var warningTimeot;

		loadStorageItem();


		function loadStorageItem(){
		
			var cookieSave = getCookie(cookieName);
			var saveItem = [];

			if(localStorage && localStorage.todoJQ){
				saveItem = localStorage.todoJQ.split(splitChar);
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


		function getCookie(name) {

  			var matches = document.cookie.match(new RegExp(
   				"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  			));
  			return matches ? decodeURIComponent(matches[1]) : undefined;
		}


		function storageTodos(){

			var storeObj = {};
			var allTodos = node.find('.todo-one-todo');

			$.each(allTodos, function(i){
				var oneStorageTodo = {};
				oneStorageTodo.cbState = allTodos[i].querySelector('.todo-check').checked;
				oneStorageTodo.todoText = allTodos[i].querySelector('.todo-one-todo-text').innerHTML;
				storeObj["todo" + i] = oneStorageTodo;	
			});
			var storeString = JSON.stringify(storeObj);

			setToLocalStorage(storeString);	
			setCookie(storeString)
		}


		function setToLocalStorage(qString){

			if(localStorage){
				localStorage.todoJQ = qString;		
			}
		
		}


		function setCookie(qString) { 
	   
	    	var dataCookie = new Date();

	    	dataCookie.setTime(dataCookie.getTime() + expiresCookie*1000);
	    	expiresCookie  = dataCookie.toUTCString();	 
	    	qString = encodeURIComponent(qString);
	 
	   		var updatedCookie = cookieName + "=" + qString + ";expires" + "=" + expiresCookie;

  			document.cookie = updatedCookie;
		}


		function updateState(){			

			allCB = node.find('.todo-check'); 	
			var allCBLength = allCB.length;
			var checkedCBLength = allCB.filter(":checked").length;
			var uncheckedCBLength = allCBLength - checkedCBLength;

			if(allCBLength){
				todoControl.css('display','block');
				taskList.css('display','block');

				if(checkedCBLength){
					deleteSelectedTask.css('display','inline-block');
				}else{
					deleteSelectedTask.css('display','none');
				}

				if(uncheckedCBLength || !checkedCBLength){
					mainCB.prop('checked', false);
				}else{
					mainCB.prop('checked', true);
				}	

			}else{	
				todoControl.css('display','none');	
				taskList.css('display','none');	
			}

			storageTodos();	
			deleteSelectedTask.text('Clear '+ checkedCBLength +' completed items');
			taskCounter.text(uncheckedCBLength);
		}


		function createTask(taskText, state){

			if(allCB.length < limitCountTask){

				todoWarning.text('');
				var oneTask = $("<div/>", {
      				"class": "todo-one-todo",

      				mouseover: function(){
      					var deleteButton = $(this).children().filter(".todo-delete-one-todo");
						deleteButton.css('display','block');	
      				},

      				mouseout: function(){
						var deleteButton = $(this).children().filter(".todo-delete-one-todo");
						deleteButton.css('display','none');	
      				},

      				dblclick: function(event){

      					var target = $(event.target);

      					if(!target.hasClass('todo-check')){
      						var self = $(this);     			
      						var textTask = $(this).children().filter(".todo-one-todo-text");
      						var textInTask = textTask.text();


      						function saveTaskValue(){
      							
      							todoWarning.text('');
								var newText = inputField.val();		
								var correctValue = newText.substr(0, limitLengthTaskName);
								var newTask =  textTask.text(correctValue);

								if(correctValue && $.trim(correctValue) !== ''){
									self.find('.todo-check').after(newTask);
									inputField.remove();	
								}else{
									self.remove();				
								}

        						updateState();	
							}

      						if(textInTask){

      						textTask.remove(); 
      					      						
      							var inputField = $("<input/>", {
									"class": "todo-change-input",
									"type": "text",
									"maxlength":25,
									"value": textInTask,

									blur:function (){	
										saveTaskValue();
    								},

    								keypress:function (event){	

    									if (event.keyCode === 13) {
											saveTaskValue();
										}
    								},

    								keyup:function(event){

    									var inputTaskNameFieldVal = $(event.target).val();

										if(inputTaskNameFieldVal.length >= limitLengthTaskName){
											todoWarning.text('Maximum length of task name: ' + limitLengthTaskName);
										}else{
											todoWarning.text('');
										}
    								}
								}).appendTo(self);

								inputField.focus();   				
      						}
      					}	
					}
				})		

				var oneTaskCB = $("<input/>", {
					"class": "todo-check",
					"type": "checkbox",
					"checked":state
				}).appendTo(oneTask);

				var oneTaskText = $("<div/>", {
					"class": "todo-one-todo-text",
					"text": taskText
				}).appendTo(oneTask);

				var oneTaskDelButton = $("<div/>", {
					"class": "todo-delete-one-todo",
					"text": "x"
				}).appendTo(oneTask);

				oneTask.prependTo(taskList);
				allCB = node.find('.todo-check');
				updateState();
			}else{
				todoWarning.text('You may add ' + limitCountTask + ' tasks only');	
				clearInterval(warningTimeot);

				warningTimeot = setTimeout(function(){
					todoWarning.text('');
				}, warningShowTime)	
			}
		}

		mainCB.click( function() { 
    		if(!$(this).prop('checked') && allCB.prop('checked')){ 
        		allCB.prop('checked', false);        
    		} else {
        		allCB.prop('checked', true); 
    		}
    		updateState();
		});

		taskList.click( function(event) {
			var target = $(event.target);

			if(target.hasClass('todo-check')){
				updateState();
			}
		
			if(target.hasClass('todo-delete-one-todo')){
		    	var oneTask = target.parent("div");
    			oneTask.remove();
    			updateState();
			}				
		});

		deleteSelectedTask.click( function() {
    		var allCheckedCB = allCB.filter(":checked");
    		var allCheckedTasks = allCheckedCB.parent("div");
    		allCheckedTasks.remove();
    		updateState(); 
		});

		inputTaskNameField.keypress(function (event) {	

			if (event.keyCode === 13) {

				var inputTaskNameFieldVal = inputTaskNameField.val();
				var correctValue = inputTaskNameFieldVal.substr(0, limitLengthTaskName);

				if(correctValue && $.trim(correctValue) !== ''){
					createTask(correctValue);					
				}

				inputTaskNameField.val('');
    		}	
		});

		inputTaskNameField.keyup(function (event) {	

			var inputTaskNameFieldVal = inputTaskNameField.val();

			if(inputTaskNameFieldVal.length >= limitLengthTaskName){
				todoWarning.text('Maximum length of task name: ' + limitLengthTaskName);
			}else if (event.keyCode !== 13) {
				todoWarning.text('');
			}
		});
	}
});