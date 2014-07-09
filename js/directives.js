var firstAppDirectives = angular.module('firstApp.directives', []);

firstAppDirectives.directive("expanded", function(){
    return {
        link:function(scope,element,attr){
            element.bind("click", function(){
                var buttonBlock = element.parent("ul");
                var allButtons = buttonBlock.children();
                var cssClassName = attr["expanded"];

                allButtons.removeClass(cssClassName);
                element.addClass(cssClassName);
            })
        }
    }
});

firstAppDirectives.directive("expandedTab", function(){
    return {
        link:function(scope,element,attr){
            scope.$watch('currentWidget', function(){
                var firstTab = element.children().eq(0);
                if(firstTab){
                    var cssClassName = attr["expandedTab"];
                    firstTab.addClass(cssClassName);
                }
            })
        }
    }
});

firstAppDirectives.directive("reloaded", function(){
    return {
        link:function(scope,element,attr){
            scope.$watch('tabContent', function(){
                if(scope.tabContent){
                    if(scope.showPortfolio){
                        element.html('');
                        var info = $('<pre>');
                        info.text(scope.tabContent);

                        if(scope.currentTask.indexOf('.js') !== -1){
                            element.append(info);
                            $('pre').each(function(i, e) {hljs.highlightBlock(e);});
                        }else{
                            info.addClass('widget-description');
                            element.append(info);
                        }
                    }else{
                        element.html(scope.tabContent);
                    }
                }else{
                    element.html(scope.infoText);
                }
            })
        }
    }
});

firstAppDirectives.directive("shower", function($http){

    var cssRegExp = /<link.+>/g;
    var hrefRegExp = /href.+\b|>/;
    var srcRegexp = /[A-Za-z0-9_\/]+\.[A-Za-z]{2,4}/g;

    return {
        link:function(scope,element,attr){

            element.bind("click", function(){

                if(scope.currentWidget && scope.showPortfolio){
                    element.html('back');
                    scope.selfContent = scope.tabContent;

                    var taskName = scope.currentWidget.name;
                    var pathToDemo = 'widgets/' + scope.currentWidget["name"] + '/' + scope.currentWidget["demo"];

                    if(scope.cacheTask[pathToDemo]){
                        scope.tabContent = scope.cacheTask[pathToDemo];
                    }else{
                        scope.tabContent = '<img class="loader-img" src="img/loading.gif">';
                        $http.get(pathToDemo).success(function(data) {
                            var newData = getWidgetOnly(data, taskName);
                            scope.tabContent = newData;
                            scope.cacheTask[pathToDemo] = newData;
                        });
                    }
                }else if(scope.selfContent){
                    element.html('demo');
                    scope.tabContent = scope.selfContent;
                }
                scope.showPortfolio = !scope.showPortfolio;

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
                        oneLink.href = "widgets/"+ taskName + "/" + hrefInner;
                        document.head.appendChild(oneLink);
                        getCSS(response);
                    }else{
                        return
                    }
                }

                function replaceSrcScriptInBody(tempBodyHTML, taskName){

                    var countSrcToReplace = tempBodyHTML.match(srcRegexp);
                    for(var i = 0; i < countSrcToReplace.length; i++){
                        var resultStr = tempBodyHTML.replace(srcRegexp, "widgets/" + taskName + "/" + "$&");
                    }
                    return resultStr
                }
            })
        }
    }
});