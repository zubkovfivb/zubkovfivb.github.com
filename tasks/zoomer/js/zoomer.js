'use strict'
function makeZoomable(node){
    var hider = $('.hider-zoomer');
    var container = $('.container2-zoomer');
    var close = $('.close-zoomer');
    var bigImg = $('.bigImg-zoomer');

    node.bind("click", function(event) {
        if(event.target.nodeName === 'IMG'){

            bigImg.attr("src", $(event.target).attr("src").replace("small","large") );
            
            hider.css("display", "block");

            container.css("display", "block");
            close.css("top", bigImg[0].offsetTop);
            bigImg.ready(function(){
                resizer();    
            });
        }
        function closeImge(){
            bigImg.attr('src','');
            hider.css("display", "none");
            container.css("display", "none");
        }
        
        close.bind("click", function() {
            closeImge();
        });
         
        $('body').bind("keydown",function (event){
                if(event.which === 27){
                    closeImge();
                }
            });

        $( window ).resize(resizer); 

        function resizer() {
            var windowWidth = window.innerWidth || document.body.clientWidth;
            var windowHeight = window.innerHeight || document.body.clientHeight;

            bigImg.css('max-width', windowWidth*0.8+'px');
            bigImg.css('max-height', windowHeight*0.8+'px');
        }

    });

}

makeZoomable($('.gallery-1-zoomer'));
makeZoomable($('.gallery-2-zoomer'));