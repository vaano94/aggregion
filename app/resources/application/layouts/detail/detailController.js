//detailController.js
/**
 * This controller is intended to work with list.html view
 */
angular
    .module('app')
    .controller('detailController', ['$resource', '$scope', 'getBook', 'getBundles', 'apiService',
        function detailController($resource, $scope, getBook, getBundles, apiService) {

            // here vm means ViewModel
            var vm = this;

            vm.book = getBook;
            vm.bundles = getBundles;
            vm.loadBundle = apiService.composeImageLink;


        }]);