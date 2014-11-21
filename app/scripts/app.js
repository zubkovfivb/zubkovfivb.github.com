'use strict';

/**
 * @ngdoc overview
 * @name zubkovfivbgithubcomApp
 * @description
 * # zubkovfivbgithubcomApp
 *
 * Main module of the application.
 */
angular
  .module('zubkovfivbgithubcomApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
