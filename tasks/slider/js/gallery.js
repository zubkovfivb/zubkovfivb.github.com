(function () {
    "use strict";

    var imageStrip = $('.imageStrip');
    var selectionPointer = $('.selectionPointer');
    var buttons = $('.button-slider');
    var interval;
    var timout;
    var defMarginSliderLeft = -910;
    var defMarginPointerTop = 25;
    var arrMarginSlidesLeft =[];
    var arrMarginPointerTop =[];
    var itemNumber = 0;
    for(var i = 0; i < buttons.length; i++){
        arrMarginSlidesLeft.push(defMarginSliderLeft*i);
        arrMarginPointerTop.push((defMarginPointerTop += 90) - 90);
    }
    buttons[0].className = 'button-slider-active';
    
    function startAnimate(itemNumber){
        paintButton(itemNumber)
        selectionPointer.stop().animate({"top": arrMarginPointerTop[itemNumber] + "px"}, "slow");
        imageStrip.stop().animate({"left": arrMarginSlidesLeft[itemNumber] + "px"}, "slow");
        
    }

    function paintButton(itemNumber){
        for(var i = 0; i < buttons.length; i++){
            buttons[i].className = 'button-slider';
        }       
        buttons[itemNumber].className = 'button-slider-active';
    }

    function createInterval(){
        interval = setInterval(function(){       
            itemNumber++;
            if(itemNumber >= buttons.length){
                itemNumber = 0;
            }
            startAnimate(itemNumber);
        } , 2000);
    }     

    function init(){
        for(var i = 0; i < buttons.length; i++){   
            buttons[i].onclick = function(event) {
                clearInterval(interval);    
                clearTimeout(timout);        
                for(var j = 0; j < buttons.length; j++){
                    if(buttons[j] === event.target){
                        itemNumber = j;
                        startAnimate(itemNumber);
                    }
                }
                timout = setTimeout(createInterval,3000);        
            } 
        }
        createInterval();
    }

    window.createSlider = {
        initSlider: function () {
            init();          
        } 
    }

}());

createSlider.initSlider();