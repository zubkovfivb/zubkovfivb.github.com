$(function(){

    var buttonPanel = $('.buttonPanel');
    var fileContentWrapper = $('.fileContentWrapper');
    var tabsContainer = $('.tabsContainer');
    var tabsContainerWrapper = $('.tabsContainerWrapper');
    var arrowBlock = $('.arrowBlock');
    var previousTabArrow = $('.previousTabArrow');
    var nextTabArrow = $('.nextTabArrow');

    var fileTypeRegExp = /\.(\w+)$/;    
    var replaseRegExp = /^(\w+)\//;
    var cssRegExp = /<link.+>/g;
    var hrefRegExp = /href.+\b|>/;
    var srcRegexp = /[A-Za-z0-9_\/]+\.[A-Za-z]{2,4}/g;

    hljs.configure({tabReplace:'  ', languages:['js']});
    var allConfigFile = ['hierarchyConfigs.json'];    
    var widthTabsContainer = 200;
    var leftShiftTabsContainer = 0;

    var previousSelectedButton;
    var previousShowedTabBlock;
    var previousShowedFileContent;
    var previousSelectedTab;

    var groupTasksButtonNameArray = [];    
    var buttonTaskNameArray = [];
    var tabsNameArray = [];
    var tabsArray = []; 
    var fileContentArray =[];

/********************************************************************************************/
    
    start();


/*  1    ****************  рисуем приветствие и 2  ******************************************/ 
    
    function start(){        
        getConfigForAll(allConfigFile);
        //paintHello();
    }

/*  2   *****************  вытаскуем имена в массивы  и 3 ***********************************/
    function getConfigForAll(configFile){
        $.getJSON(configFile).then(function(tasks){ 
            for(var category in tasks) {
                groupTasksButtonNameArray.push(category);
 
                var tempButtonTaskNameArray = [];
                var tempTabsNameArray = [];
                var tempTabsArray = [];
                var tempFileContentArray = [];

                for(var subCategory in tasks[category]) {
                    var oneTabBlock = tasks[category][subCategory];
                    tempButtonTaskNameArray.push(subCategory);
                    tempTabsNameArray.push(oneTabBlock);
                    var tempArr = [];

                    for(var i = 0; i < oneTabBlock.length; i++ ){
                                                            
                        tempArr[i] = false;    
                    }
            
                    tempTabsArray.push(tempArr.slice());
                    tempFileContentArray.push(tempArr.slice());  
                }
                
                
                tabsNameArray.push(tempTabsNameArray);
                buttonTaskNameArray.push(tempButtonTaskNameArray);
                tabsArray.push(tempTabsArray);
                fileContentArray.push(tempFileContentArray);
                
            }

            createAllElements();
        });            
    } 
/*  3   *************** создаем элементы и 4 ************************************************/
    function createAllElements(){
        for(var i = 0; i < groupTasksButtonNameArray.length; i++){
            var mainButton = $('<div class="mainButton">' + groupTasksButtonNameArray[i] + '</div>');     
            var buttonBlock = $('<div class="buttonBlock"></div>');
            buttonPanel.append(mainButton);
            buttonPanel.append(buttonBlock);

            for(var j = 0; j < buttonTaskNameArray[i].length; j++){
                var button = $('<div class="button">' + buttonTaskNameArray[i][j] + '</div>');
                buttonBlock.append(button);
            }   

            for(var k = 0; k < tabsNameArray[i].length; k++){
                for(var l = 0; l < tabsNameArray[i][k].length; l++){
                    
                    var replacedTabName = tabsNameArray[i][k][l].replace(replaseRegExp, ""); 
                    
                    var tab = $('<ol class="tab">'+ replacedTabName +'</ol>');

                    tabsArray[i][k][l] = tab;
                    tabsContainer.append(tab);
                }
            } 
        }                
    }

/*********************** обрабатываем клик по кнопке ***************************************/
    buttonPanel.click(function (event) {

        var target = event.target;

        if($(target).hasClass('mainButton')){
            show(target);
        }

        if($(target).hasClass('button')){
            show(target);
        }
    });

/***************************** обрабатываем нажатие на таб *************************************/
tabsContainer.click(function (event) {
    
    var target = event.target;   
    show(target);
    
});

/************************ обрабатываем ресайз панели табов **********************************/

    function resizeButtonsPanel(){

        if(widthTabsContainer > tabsContainerWrapper.width()){                 
            arrowBlock.css('display','block');
        }else{
            leftShiftTabsContainer = 0;
            tabsContainer.css({'margin-left': leftShiftTabsContainer+'px'});
            arrowBlock.css('display','none');      
        }
    }

/******************** вешаем обработчик на ресайз окна *************************************/    
    
    $( window ).resize(function() {
        resizeButtonsPanel();
    });

/******************** обрабатываем клик по стрелочкам **************************************/    
    
    previousTabArrow.click(function (event) {
        if(leftShiftTabsContainer < 0){
            leftShiftTabsContainer += 200;
            tabsContainer.css({'margin-left': leftShiftTabsContainer+'px'});    
        }
    });
    
    nextTabArrow.click(function (event) {
        if(tabsContainerWrapper.width() <= (widthTabsContainer + leftShiftTabsContainer)){
            leftShiftTabsContainer -= 200;
            tabsContainer.css({'margin-left': leftShiftTabsContainer+'px'});
        }
    });

/********************************** показываем элементы ************************************/

function show(element){
    
    if(element.className === 'mainButton'){
        var blockWithButtons = $('.buttonBlock');
        
        for(var i = 0; i < groupTasksButtonNameArray.length; i++){
            if(groupTasksButtonNameArray[i] === element.innerHTML){

                show(blockWithButtons[i]);                 
                }
            }         
    }
    
    if(element.className === 'buttonBlock'){
        if( !element.style.display || element.style.display === 'none'){
            element.style.display = 'block';

            show(element.children[0]);
        }else{
            element.style.display = 'none';
        }      
    }
    
    if(element.className === 'button'){
        
        if(previousSelectedButton){
            previousSelectedButton.className = 'button';        
        }   
        
        element.className = 'buttonActive';
        previousSelectedButton = element;

        for(var j = 0; j < groupTasksButtonNameArray.length; j++){
            for(var i = 0; i < buttonTaskNameArray[j].length; i++){
                if(element.innerHTML ===  buttonTaskNameArray[j][i]){
                    show(tabsArray[j][i]);    
                }
            }             
        }
    }    

    if(element.length){
        leftShiftTabsContainer = 0;
        widthTabsContainer = 0;
        tabsContainer.css({'margin-left': 0 +'px'});
        
        if(element[0][0].className === 'tab'){
            if(previousShowedTabBlock){
                for(var k = 0; k < previousShowedTabBlock.length; k++){
                
                    previousShowedTabBlock[k][0].style.display = 'none';
                    previousShowedTabBlock[k][0].className = 'tab';             
                }
            }  
        
            for(var j = 0; j < element.length; j++){
                element[j][0].style.display = 'block'; 
                widthTabsContainer += 200;
            }
       
            show(element[0][0]);
            previousShowedTabBlock = element;    
            resizeButtonsPanel();
        }     
    }
    
    if(element.className === 'tab'){       
                
        if(previousSelectedTab){
            previousSelectedTab.className = 'tab';
        }    
        
        element.className = 'tabActive';  
        previousSelectedTab = element;
        
        for(var k = 0; k < tabsArray.length; k++){

        
        for(var i = 0; i < tabsArray[k].length; i++){
            for(var j = 0; j < tabsArray[k][i].length; j++){
            
                if(tabsArray[k][i][j][0] === element){
 
                    if(!fileContentArray[k][i][j]){
                        getFileDataAjax(buttonTaskNameArray[k][i], tabsNameArray[k][i][j], k, i, j);
                    }else{

                        show(fileContentArray[k][i][j][0]);
                    }                     
                }
            }       
        }  
        } 
    }
    
    if($(element).hasClass('fileContent')){
             
        if(previousShowedFileContent){
            previousShowedFileContent.style.display = 'none';  
        }
        previousShowedFileContent = element;
        element.style.display = 'block';  
    }
    
}

/*  4   ************** шлем аяксы **********************************************************/
    
    function getFileDataAjax(taskName, fileName, k, i, j){

        $.ajax({
            url: 'tasks/' + taskName + '/' + fileName,
            dataType: 'text',
            success: function (response){
                var fileType = getFileType(fileName);

                if(fileType === 'html'){
                    var widgetHTML = getWidgetOnly(response, taskName);
                    var tabContent = document.createElement('pre');
                    tabContent.className = "fileContent";
                    tabContent.innerHTML = widgetHTML;
                    fileContentWrapper.append(tabContent);
                    fileContentArray[k][i][j] = $(tabContent);
                
                    show(fileContentArray[k][i][j][0]);                      
                }else{
                    var tabContent = $('<pre class="fileContent"></pre>');
                    tabContent.text(response);                
                    tabContent.css('display','none');
                    fileContentWrapper.append(tabContent); 
                    if(fileType === 'js'){
                        tabContent.each(function(i, e) {hljs.highlightBlock(e);});
                    }             
                    fileContentArray[k][i][j] = tabContent;
                
                    show(fileContentArray[k][i][j][0]);                    
                }

                

           }         
        });
    }
/*******************************************************************************************/
    function getFileType(fileName){

        var serchIndex = fileName.search(fileTypeRegExp);

        if (serchIndex != -1){
            return fileName.substring(serchIndex + 1).toLowerCase();
        }else{
            return 'txt';
        }    
    }

    function getWidgetOnly(response, taskName){
        getCSS(response, taskName);

        var tempBodyHTML = response.substring(response.indexOf('body'),response.indexOf('</body'));
        var tempBodyHTML = tempBodyHTML.substring(tempBodyHTML.indexOf('<')); 

        return replaceSrcScriptInBody(tempBodyHTML, taskName)
    }

    function getCSS(response, taskName){

        var oneLinkCss = cssRegExp.exec(response);

        if ( oneLinkCss !== null){

            var tempHrefStr = hrefRegExp.exec(oneLinkCss[0]);
            var hrefInner = tempHrefStr[0].substring(tempHrefStr[0].indexOf('"')+1);
            var oneLink = document.createElement('link');

            oneLink.rel = "stylesheet";
            oneLink.href = "tasks/"+ taskName + "/" + hrefInner;
            document.head.appendChild(oneLink);
            getCSS(response);
        }else{
            return
        }
        
        
    }

    function replaceSrcScriptInBody(tempBodyHTML, taskName){

        var countSrcToReplace = tempBodyHTML.match(srcRegexp);
        for(var i = 0; i < countSrcToReplace.length; i++){
            var resultStr = tempBodyHTML.replace(srcRegexp, "tasks/" + taskName + "/" + "$&");
        }  

        return resultStr
    }


/*******************************************************************************************/
});


