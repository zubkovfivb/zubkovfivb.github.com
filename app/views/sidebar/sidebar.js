'use strict';

angular.module('angularPassportApp')
    .controller('SidebarCtrl', function ($injector, $scope, Auth, $location, $rootScope) {
      var config = $injector.get('config');

      $scope.menu = config.menu;

      $rootScope.$on('refreshData', function(){
        console.log('work')
      })

    });
