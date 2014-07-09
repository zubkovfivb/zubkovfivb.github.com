var firstAppControllers = angular.module('firstApp.controllers', ['ngAnimate']);

firstAppControllers.controller("FirstCtrl", function($scope, $http) {
    hljs.configure({tabReplace:'  ', languages:['js']});
    $scope.showDemoBtn = false;
    $scope.showPortfolio = true;
    $scope.cacheTask = {};
    $scope.titleName = 'Portfolio';
    $scope.infoText =
        "<div class='info-me'>" +
            "<h3>About me</h3>"+
            "<p>My experience in develop- about 1 year, my job is to fix bugs and add new features to existing functionality. I'm not very good in html and css, but and not very bad . I like JS with his libraries and frameworks. </p>" +
            "<p><b>Main skills:</b> html, css, javascript, JQuery, entry level nodeJS, entry level AngularJS;</p>" +
            "<p><b>Other:</b> java(core, servlet, ant, jsp, hibernate), php, xml, sql;</p>" +
            "<p><b>Ide:</b> webstorm, sublime, eclipse, netbeans, notepad++, phpdesigner;</p>" +
            "<p><b>English:</b> pre - intermediate;</p>" +
        "</div>";
// my skills: html, css, JavaScript, JQuery, entry level nodeJS, entry level AngularJS; you may see, my works and more info in my portfolio - http://zubkovfivb.github.io

// get widget list from json data
    $http.get('model/data.json').success(function(data) {
        $scope.widgetList = data;
    });

// click on widget-btn
    $scope.showTabs = function(obj){
        $scope.currentWidget = obj;
        $scope.showDemoBtn = true;
    };

// click on tab
    $scope.showTabsContent = function(nameTab){

        $scope.currentTask = nameTab;
    };

// watcher selected widget-btn
    $scope.$watch('currentWidget', function() {
        if($scope.currentWidget){
            $scope.titleName = $scope.currentWidget.name;
            $scope.taskList = $scope.currentWidget["task"];
        }
    });

// watcher change task list
    $scope.$watch('taskList', function() {
        if($scope.taskList) {
            $scope.currentTask = $scope.taskList[0];
            $scope.pathKey = 'widgets/' + $scope.currentWidget["name"] + '/' + $scope.currentTask;
        }
    });

// watcher selected task
    $scope.$watch('currentTask', function() {
        if($scope.currentTask) {
            $scope.pathKey = 'widgets/' + $scope.currentWidget["name"] + '/' + $scope.currentTask;
        }
    });

// watcher changes in download path
    $scope.$watch('pathKey', function() {
        if($scope.pathKey){
            $scope.getContent($scope.pathKey);
        }
    });

    $scope.getContent = function(path){
        if($scope.cacheTask[path]){
            $scope.tabContent = $scope.cacheTask[path];
        }else if($scope.currentTask){
            $http.get(path).success(function(data) {
                $scope.cacheTask[path] = data;
                $scope.tabContent = data;
            });
        }
    }
});