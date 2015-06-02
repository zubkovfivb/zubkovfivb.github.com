angular.module('angularPassportApp').config(function ($routeProvider, $locationProvider, $httpProvider) {
    $httpProvider.interceptors.push('httpLoadingInterceptor');
    $locationProvider.html5Mode(true);

    $routeProvider
        .when('/', {
            templateUrl: 'pages/main/main.html',
            controller: 'MainCtrl'
        })
        .when('/login', {
            templateUrl: 'pages/login/login.html',
            controller: 'LoginCtrl'
        })
        .when('/signup', {
            templateUrl: 'pages/signup/signup.html',
            controller: 'SignupCtrl'
        })
        // Blogs
        .when('/blogs', {
            templateUrl: 'pages/blogs/list.html',
            controller: 'BlogsCtrl'
        })
        .when('/blogs/create', {
            templateUrl: 'pages/blogs/create.html',
            controller: 'BlogsCtrl'
        })
        .when('/blogs/:blogId/edit', {
            templateUrl: 'pages/blogs/edit.html',
            controller: 'BlogsCtrl'
        })
        .when('/blogs/:blogId', {
            templateUrl: 'pages/blogs/view.html',
            controller: 'BlogsCtrl'
        })

        //Users
        .when('/users', {
            templateUrl: 'pages/users/users.html',
            controller: 'UserCtrl'
        })
        .when('/users/:userId', {
            templateUrl: 'pages/users/user.html',
            controller: 'UserCtrl'
        })

        .otherwise({
            redirectTo: '/'
        });
});