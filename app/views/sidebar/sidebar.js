'use strict';

angular.module('angularPassportApp')
    .controller('SidebarCtrl', function ($scope, Auth, $location) {
        $scope.menu = [{
            "title": "Blogs",
            "link": "blogs"
        }];

        $scope.authMenu = [{
            "title": "Create New Blog",
            "link": "blogs/create"
        },{
          "title": "Users list",
          "link": "users"
        }];

    });
