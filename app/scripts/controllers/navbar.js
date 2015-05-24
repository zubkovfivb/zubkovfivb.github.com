'use strict';

angular.module('angularPassportApp')
  .controller('NavbarCtrl', function ($scope, Auth, $location) {
    $scope.menu = [{
      "title": "Welcome to Volley",
      "link": ""
    }];

    $scope.authMenu = [{
      "title": "Profile",
      "link": "user:id"
    }];

    $scope.logout = function() {
      Auth.logout(function(err) {
        if(!err) {
          $location.path('/login');
        }
      });
    };
  });
