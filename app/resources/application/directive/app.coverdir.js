// coverdir.js
/**
 * This directive represents book cover
 * - sets needed classes to the directive
 * - adds link to show the image
 * - if image cannot be downloaded (error) sets replacec link with another one 
 */
angular.module('app')
.directive('cover', ['api', 'apiService', '$log',
    function(api, apiService, $log) {
        return {
            restrict: 'E',
            template: '<img/>',
            replace: true,
            transclude: true,
            link: function($scope, element, attrs) {
                attrs.$set('class', attrs.class);
                
                attrs.$observe('bookTitle', function(value) {
                    attrs.$set('title', value);   // set class attribute
                });
                attrs.$observe('bookId', function(value) {
                    attrs.$set('src', apiService.composeImageLink(value)); // try to set and display original image
                });
                element.bind('error', function() {
                    attrs.$set('src', api.COVER_NOT_AVAIL_ADDRESS); // default download image
                    $log.warn("Could not load an image");
                });
            }
        }
    }
]);