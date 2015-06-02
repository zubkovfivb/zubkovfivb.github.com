'use strict';

angular.module('angularPassportApp')
  .controller('NavbarCtrl', function ($injector, $scope, Auth, $location, $rootScope) {
    var config = $injector.get('config');

    $scope.menu = config.menu;



    $scope.closeMenu = function(){
      $rootScope.$broadcast('refreshData');
    };

    $scope.logout = function() {
      Auth.logout(function(err) {
        if(!err) {
          $location.path('/login');
        }
      });
    };
  });
