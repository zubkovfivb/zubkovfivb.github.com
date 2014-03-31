(function ($) {


    'use strict';


	$.fn.tabable = function () {

        var css = $("<link>", {
            rel:  "stylesheet",
            type: "text/css",
            href: "css/jtabs.css"
        }).appendTo("head");  

    	var tabs = $(this.children()[0]);
    	var tabsContent = $(this.children()[1]);  
    	var allTabs = tabs.children();
    	var allTabsContent = tabsContent.children();
        var links = $('link');

		var tabContainerClass = 'tabbable-tabs-container';
		var tabContainerContentClass = 'tabbable-content-container';
    	var tabClass = 'tabbable-tab';	
    	var tabContentClass = 'tabbable-content';    	
    	var tabContentActiveClass = 'tabbable-content-active';
    
    	tabs.addClass(tabContainerClass);
    	tabsContent.addClass(tabContainerContentClass);
    	allTabsContent.addClass(tabContentClass);
    	allTabs.addClass(tabClass);

		show(0);

    	allTabs.on( "click", function() {

    		for(var i = 0; i < allTabs.length; i++){

    			if(allTabs[i] === this){
    				show(i);
    				return
    			}
    		}	
		});

		function show(index){

            	for(var i = 0; i < allTabsContent.length; i++){

                	var oneTabCont = ($(allTabsContent[i]));

                	if(oneTabCont.hasClass(tabContentActiveClass)){
                    	oneTabCont.removeClass(tabContentActiveClass).addClass(tabContentClass);
                	}
            	}

            	$(allTabsContent[index]).removeClass(tabContentClass).addClass(tabContentActiveClass);       	
        }

        function checkForExistCss(){
            for(var j = 0; j < links.length; j++){
                if(links[j].href.indexOf('jtabs.css') !== (-1)){
                    return false
                }
            }
            return true    
        }

    	return {

        	show: function(index){

        		if((index >= 0) && (index < allTabsContent.length)){
        			show(index);
        		}

        	},

        	destroy: function(){

        		allTabs.off('click');

            	if(tabs.hasClass(tabContainerClass)){
                	tabs.removeClass(tabContainerClass);
            	}

            	if(tabsContent.hasClass(tabContainerContentClass)){
                	tabsContent.removeClass(tabContainerContentClass);
            	}
            
            	for(var i = 0; i < allTabsContent.length; i++){  

            		var oneTab = $(allTabs[i]);
            		var oneTabCont = $(allTabsContent[i]); 

                	if(oneTab.hasClass(tabClass)){
                    	oneTab.removeClass(tabClass);
                	}

                	if(oneTabCont.hasClass(tabContentClass)){   
                    	oneTabCont.removeClass(tabContentClass);
                	}

                	if(oneTabCont.hasClass(tabContentActiveClass)){   
                    	oneTabCont.removeClass(tabContentActiveClass);
                	}

            	}        

                for(var j = 0; j < links.length; j++){
                    if(links[j].href.indexOf('jtabs.css') !== (-1)){
                        links[j].remove()
                    }
                }
        	}
    	}
	}

}(jQuery));