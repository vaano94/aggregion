//gridController.js
/**
 * This controller is intended to work with catalog.html view
 */
angular
.module('app')
.controller('catalogController', ['$resource', 'wholeCatalog', '$scope', 
function catalogController($resource, wholeCatalog, $scope) {

    // here vm means ViewModel
    var vm = this;
   
    vm.books = wholeCatalog;

}]);