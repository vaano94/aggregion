// interceptors.js
angular
    .module('app')
    .factory('customHttpInterceptor', customHttpInterceptor );

function customHttpInterceptor($q, $log, $rootScope) {
    return {
        'responseError': function (rejection) {
            switch (rejection.status) {
                case 400 : {
                     $log.warn("Bad request on " + rejection.config.url); break;
                }
                case 404 : {
                    $log.warn("Page " + rejection.config.url + " does not exist!"); break;
                }
                case 500 : {
                    $log.warn("Internal server error after call to " + rejection.config.url); break;
                }
                default : {
                    $log.warn("Error");
                }
            }
            return $q.reject(rejection);
        },
    }
}

// add our interceptors to $httpProvider
angular
.module('app')
.config(function($httpProvider){
$httpProvider.interceptors.push('customHttpInterceptor');   
}); 
