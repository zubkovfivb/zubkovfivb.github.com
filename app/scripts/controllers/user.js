'use strict';

angular.module('angularPassportApp')
    .controller('UserCtrl', function ($injector, $scope, $routeParams) {
      var User = $injector.get('User');

      $scope.loadUsers = function() {
        User.query(function(users) {
          $scope.users = users;
        });
      };

      $scope.findOne = function() {
        User.get({
          userId: $routeParams.userId
        }, function(user) {
          $scope.user = user;
        });
      };

//      $scope.loadUsers();
    });
