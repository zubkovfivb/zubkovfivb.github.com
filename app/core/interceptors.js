angular.module('angularPassportApp').factory('httpLoadingInterceptor', function($rootScope, $injector){

    var $q = $injector.get('$q');
    var pendingRequestsCount = 0;

    return {
        request: function(config) {
            // skip the html templates
            if (config.url.indexOf('tpl') === -1) {
                console.log('request')
                $rootScope.$broadcast('ajaxRequest:start', ++pendingRequestsCount);
            }

            return config;
        },

        response: function(response) {
            // skip the html templates
            if (response.config.url.indexOf('tpl') === -1) {
                $rootScope.$broadcast('ajaxRequest:end', --pendingRequestsCount);
            }

            return response;
        },

        'responseError': function(rejection) {
            if (rejection.config.url.indexOf('tpl') === -1) {
                $rootScope.$broadcast('ajaxRequest:end', --pendingRequestsCount);
            }

            return $q.reject(rejection);
        }
    };
});