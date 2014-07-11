var settings = {
    fieldHeight: 5,
    fieldWidth: 6,
    entrySize: 150,
    allImg:[
            {"name":"widgets/shuffle/img/small/cat-1.jpg","category":"cats"},
            {"name":"widgets/shuffle/img/small/cat-2.jpg","category":"cats"},
            {"name":"widgets/shuffle/img/small/cat-3.jpg","category":"cats"},
            {"name":"widgets/shuffle/img/small/cat-4.jpg","category":"cats"},
            {"name":"widgets/shuffle/img/small/cat-5.jpg","category":"cats"},
            {"name":"widgets/shuffle/img/small/cat-6.jpg","category":"cats"},
            {"name":"widgets/shuffle/img/small/cat-7.jpg","category":"cats"},
            {"name":"widgets/shuffle/img/small/puppy-1.jpg","category":"dogs"},
            {"name":"widgets/shuffle/img/small/puppy-2.jpg","category":"dogs"},
            {"name":"widgets/shuffle/img/small/puppy-3.jpg","category":"dogs"},
            {"name":"widgets/shuffle/img/small/puppy-4.jpg","category":"dogs"},
            {"name":"widgets/shuffle/img/small/puppy-5.jpg","category":"dogs"}]
};

(function(settings){

    var fieldHeight = settings.fieldHeight || 5;
    var fieldWidth = settings.fieldWidth || 8;
    var entrySize = settings.entrySize || 100;

    var currentBlock = document.getElementById("currentBlock");
    var matrix = [];
    var bigImageArray = [];
    var miniImageArray = [];
    var allImage;
    var imgObjArray;

    initialize();

    /***************************************************** control function **************************************/

    function initialize(){
        /** init block **/
        setContainerSize();

        var imgDeffer = createImageObject();
        $.when(imgDeffer).done(function() {
            createCategoryBtns();
            /** shuffle & math **/
            var resultShuffle = shuffle(allImage);
            createArraySizeElements(resultShuffle);
            createMatrix();
            imgObjArray = addAllImage();

            /** add to DOM **/
            addImgBlock(imgObjArray);
            makeZoomable($('#currentBlock>div'));
        })

    }

    function shufflePicture(imgInCat){

        var allImg = imgInCat || allImage;
        matrix = [];
        bigImageArray = [];
        miniImageArray = [];

        if(imgInCat){
            showCategory(imgInCat);
        }
        var resultShuffle = shuffle(allImg);
        createArraySizeElements(resultShuffle);
        createMatrix();
        imgObjArray = addAllImage();

        var imgToAnimate = moveToNewPosition(imgObjArray);
        animateMove(imgToAnimate);
    }

    /***************************************************** show image in category **************************************/

    function showCategory(imgInCat){

        var imgInDom = $('.imgWrapper img');
        var arrImgSrcInCat = [];

        for(var i = 0; i < imgInCat.length; i++){
            arrImgSrcInCat.push(imgInCat[i].image.src)
        }

        $.each(imgInDom, function(){
            var currentImg = $(this);
            var wrapper = currentImg.parent('div');

            if(arrImgSrcInCat.indexOf(this.src) !== (-1)){
                wrapper.animate({"opacity":1},400);
                wrapper.css("z-index", 2);
            }else{
                wrapper.animate({"opacity":0},600);
                wrapper.css("z-index", 1);
            }
        });
    }

    /***************************************************** create new position object **************************************/

    function moveToNewPosition(allImgObj){

        var allImageInDom = document.querySelectorAll('.imgWrapper img');
        var allMove = [];

        for(var i = 0; i < allImgObj.length; i++){
            for(var j = 0; j < allImageInDom.length; j++){
                if(allImageInDom[j].src === allImgObj[i].image.src){

                    var parentDiv = allImageInDom[j].parentNode;
                    var oneMove = {
                        "node": $(parentDiv),
                        "left": entrySize * allImgObj[i].column,
                        "top": entrySize * allImgObj[i].row
                    };
                    allMove.push(oneMove);
                }
            }
        }
        return allMove
    }

    /***************************************************** animate moving **************************************/

    function animateMove(allMove){
        for(var i = 0; i < allMove.length; i++){
            allMove[i].node.animate({"left": allMove[i].left + 'px',"top": allMove[i].top + 'px',"opacity":1}, 500);
        }
    }

    /***************************************************** set container size **************************************/

    function setContainerSize(){
        currentBlock.style.width = entrySize * fieldWidth + 'px';
        currentBlock.style.height = entrySize * fieldHeight + 'px';

    }

    /***************************************************** create object for all images **************************************/

    function createImageObject(){

        var resultDeffer = new $.Deferred();
        var minElemSize = Infinity;
        var tempArr = [];
        var promises_ary = [];
        var srcImageArr = settings.allImg;

        for(var i = 0; i < srcImageArr.length; i++){

            var promise = (function(index) {

                var defer = new $.Deferred();
                var tempImg = document.createElement("img");
                tempImg.src = srcImageArr[index].name;

                tempImg.onload = function(){
                    var oneImage = {};

                    var tempImgWidth = tempImg.width;
                    var tempImgHeight = tempImg.height;
                    oneImage.category = srcImageArr[index].category;
                    oneImage.image = tempImg;
                    oneImage.width = tempImgWidth;
                    oneImage.height = tempImgHeight;

                    tempArr.push(oneImage);

                    if(minElemSize > tempImgWidth){
                        minElemSize = tempImgWidth;
                    }else if(minElemSize > tempImgHeight){
                        minElemSize = tempImgHeight;
                    }
                    defer.resolve();
                };
                return defer.promise();

            })(i);
            promises_ary.push(promise);
        }

        $.when.apply($, promises_ary).done(function() {
            for(var j = 0; j < tempArr.length; j++){

                var elemWidth = tempArr[j].width;
                var elemHeight = tempArr[j].height;

                if(elemWidth > minElemSize){
                    if(elemHeight > minElemSize){
                        tempArr[j].sizeAssocNumber = 4;
                        tempArr[j].blockHeight = 300 + 'px';
                        tempArr[j].blockWidth = 300 + 'px';
                    }else{
                        tempArr[j].sizeAssocNumber = 2;
                        tempArr[j].blockHeight = 300 + 'px';
                        tempArr[j].blockWidth = 150 + 'px';
                    }
                }else if(elemHeight > minElemSize){
                    tempArr[j].sizeAssocNumber = 3;
                    tempArr[j].blockHeight = 150 + 'px';
                    tempArr[j].blockWidth = 300 + 'px';
                }else{
                    tempArr[j].sizeAssocNumber = 1;
                    tempArr[j].blockHeight = 150 + 'px';
                    tempArr[j].blockWidth = 150 + 'px';
                }
            }
            allImage =  tempArr;
            resultDeffer.resolve();

        });
        return resultDeffer.promise();
    }

    /******************************************* category buttons ********************************************************************/

    function createCategoryBtns(){

        var buttonBlock = document.querySelector('.shuffle-control');
        var allTab;
        var self;
        var tabName;
        var allCategory = {};

        function createTab(category, tabClass){
            var li = document.createElement('li');
            li.className = tabClass;
            li.innerHTML = category;
            buttonBlock.appendChild(li);
        }

        createTab("shuffle", 'shuffle-btn');
        createTab("all", 'one-category one-category-active');
        allCategory["all"] = [];

        for(var j = 0; j < allImage.length; j++){
            var category = allImage[j].category;
            allCategory["all"].push(allImage[j]);
            if(!allCategory[category]){
                allCategory[category] = [allImage[j]];
                createTab(category, 'one-category');
            }else{
                allCategory[category].push(allImage[j])
            }
        }

        allTab = buttonBlock.children;
        for(var i = 0; i < allTab.length; i++){
            if(allTab[i].className === 'one-category one-category-active'){
                self = allTab[i];
            }
        }

        buttonBlock.onclick = function(event){

            var target = event.target;

            if(target.className === 'one-category'){
                if(self){
                    self.className = 'one-category';
                }
                target.className = 'one-category one-category-active';
                self = target;

                tabName = target.innerHTML;
                shufflePicture(allCategory[tabName]);
            }

            if(target.className === 'shuffle-btn'){
                shufflePicture(allCategory[tabName]);
            }
        }
    }

    /***************************************************** create two array with images ****************************************/

    function createArraySizeElements(shuffleArray){

        for(var i = 0; i < shuffleArray.length; i++){
            var oneElement = shuffleArray[i];
            if(oneElement.sizeAssocNumber === 1){
                miniImageArray.push(oneElement);
            }else{
                bigImageArray.push(oneElement)
            }
        }
    }

    /******************************************************* shuffle array with images ********************************************/

    function shuffle(array) {
        var currentIndex = array.length;
        var temporaryValue;
        var randomIndex;

        while (0 !== currentIndex) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array
    }

    /******************************************************* create matrix *******************************************************/

    function createMatrix(){
        for(var i = 0; i < fieldHeight; i++){
            var tempArr = [];
            for(var j = 0; j < fieldWidth; j++){
                tempArr.push(0);
            }
            matrix.push(tempArr);
        }
    }

    /***************************************************** check make add to full matrix ******************************************/

    function pushToArr(element){
        for(var i = 0; i < fieldHeight; i++){
            for(var j = 0; j < fieldWidth; j++){
                if(matrix[i][j] === 0 && checkForMakeAdd(i, j, element.sizeAssocNumber)){
                    element.row = i;
                    element.column = j;
                    return element;
                }
            }
        }
        return false
    }

    /****************************************************** full matrix associate image number ************************************/

    function addElementToMatrix(element){
        switch(element.sizeAssocNumber){
            case 1:
                matrix[element.row][element.column] = element.sizeAssocNumber;
                break;

            case 3:
                matrix[element.row][element.column] = element.sizeAssocNumber;
                matrix[element.row + 1][element.column] = element.sizeAssocNumber;
                break;

            case 2:
                matrix[element.row][element.column] = element.sizeAssocNumber;
                matrix[element.row][element.column + 1] = element.sizeAssocNumber;
                break;

            case 4:
                matrix[element.row][element.column] = element.sizeAssocNumber;
                matrix[element.row + 1][element.column] = element.sizeAssocNumber;
                matrix[element.row][element.column + 1] = element.sizeAssocNumber;
                matrix[element.row + 1][element.column + 1] = element.sizeAssocNumber;
                break;
        }
    }

    /******************************************************** all check **********************************************************/

    function checkForMakeAdd(row, column, element){

        switch(element){
            case 1:
                return true;
                break;

            case 3:
                if(row < (fieldHeight - 1) && matrix[row + 1][column] === 0){
                    return true;
                }
                break;

            case 2:
                if(column < (fieldWidth - 1) && matrix[row][column + 1] === 0){
                    return true;
                }
                break;

            case 4:
                if(row < (fieldHeight - 1) && column < (fieldWidth - 1) && matrix[row][column + 1] === 0 && matrix[row + 1][column] === 0 && matrix[row + 1][column + 1] === 0){
                    return true;
                }
                break;
        }
        return false
    }

    /************************************************ start add all image **********************************************************/

    function addAllImage(){

        var imgObjArray = [];

        while(true){
            var makeAdd = false;
            var makeAddMini = false;

            if(bigImageArray.length){
                makeAdd = pushToArr(bigImageArray[0]);
            }
            if(miniImageArray.length){
                makeAddMini = pushToArr(miniImageArray[0]);
            }

            if(makeAdd){
                addElementToMatrix(makeAdd);
                imgObjArray.push(makeAdd);
                bigImageArray.splice (0,1);
            }else if(makeAddMini){
                imgObjArray.push(makeAddMini);
                addElementToMatrix(makeAddMini);
                miniImageArray.splice (0,1);
            }else{
                break;
            }
        }
        return imgObjArray;
    }

    /******************************************* show image ********************************************************************/

    function addImgBlock(allImg){

        var innerDiv = document.createElement("div");
        var div;
        var img;
        var element;

        for(var i = 0; i < allImg.length; i++){
            element = allImg[i];
            div = document.createElement("div");
            img = element.image;
            div.appendChild(img);

            div.className = 'imgWrapper';
            div.style.width = element.width + 'px';
            div.style.height = element.height + 'px';
            div.style.left = entrySize * element.column + 'px';
            div.style.top = entrySize * element.row + 'px';

            innerDiv.appendChild(div);
        }

        currentBlock.appendChild(innerDiv);
    }

    /******************************************* add ability zoomable ********************************************************************/

    function makeZoomable(node){

        var hider = $('.hider-zoomer');
        var container = $('.container2-zoomer');
        var bigImg = $('.bigImg-zoomer');

        function closeImge(){
            bigImg.attr('src','');
            hider.css("display", "none");
            container.css("display", "none");
        }

        function resizer() {
            var windowWidth = window.innerWidth || document.body.clientWidth;
            var windowHeight = window.innerHeight || document.body.clientHeight;

            bigImg.css('max-width', windowWidth*0.8+'px');
            bigImg.css('max-height', windowHeight*0.8+'px');
        }

        $( window ).resize(resizer);

        $('body').bind("click",function (event){
            if(event.target.nodeName !== 'IMG'){
                closeImge();
            }
        });

        $('body').bind("keydown",function (event){
            if(event.which === 27){
                closeImge();
            }
        });

        node.bind("click", function(event) {
            if(event.target.nodeName === 'IMG' && event.target.parentNode.style.opacity !== 0){

                bigImg.attr("src", $(event.target).attr("src").replace("small","large") );
                hider.css("display", "block");
                
                bigImg.ready(function(){
                    resizer();
                    container.css("display", "block"); 
                });
            }
        });
    }

    /***************************************************************************************************************************************/

})(settings);

