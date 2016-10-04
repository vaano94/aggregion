// routes.js
angular
        .module('app')
        .config(function ($locationProvider, $stateProvider, $urlRouterProvider, $provide) {
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
                        
            $stateProvider
                /**
                 * List state represents a view of single book detail.
                 * Details represented inside Angular md-list
                 * Has two methods:
                 * getBook method returns a single book by a given ID
                 * getBundles return a list of bundles connected with the given book ID
                 */  
                .state('list', {
                    resolve: {
                        /**
                         * @desc returns a single book by a given ID
                         * @param apiService - injected service from which we call public API
                         * @param $stateParams - need to get the id from a ui-sref link
                         * return Resource object
                         */
                        getBook: function (apiService, $stateParams) {
                            return apiService.getById($stateParams.bookId).get()
                                .$promise.then(function (book) {
                                    return book;
                                })
                        },
                        /**
                         * @desc returns an array of bundles for a given book ID
                         * @param apiService - injected service from which we call public API
                         * @param $stateParams - need to get the id from a ui-sref link
                         * return Resource object
                         */
                        getBundles: function (apiService, $stateParams) {
                            return apiService.getBundles($stateParams.bookId).get()
                                .$promise.then(function (bundles) {
                                    console.log(bundles);
                                    return bundles;
                                })
                        }

                    },
                    url: '/detail/{:bookId}',
                    templateUrl: '/resources/application/layouts/detail/detail.html',
                    controller: 'detailController',
                    controllerAs: 'detailCtrl'
                })

                 /**
                 * @desc Catalog state represents all books returned and
                 * Set as a default URL : '/'
                 * Books are represented inside Angular md-grid
                 * Has one method:
                 * wholeCatalog method returns a set of books by calling getAll function in apiService
                 */  
                .state('catalog', {
                    resolve: {
                        /**
                         * @desc returns all books
                         * @param apiService - injected service from which we call public API
                         * return Resource object
                         */
                        wholeCatalog : function(apiService) {
                           return apiService.getAll().get()
                                .$promise.then(function(books) {
                                    return books;
                                })
                            } 
                    },
                    url:'/',
                    templateUrl:'/resources/application/layouts/grid/catalog.html',
                    controller: 'catalogController',
                    controllerAs: 'catalogCtrl',
                })

                /**
                 * 404 State
                 * if no 'catalog' or 'list' states are called - then use 404_error state
                 */
                .state('404_error', {
                    url:'/404_error',
                    templateUrl:'/resources/application/layouts/404/404.html',
                }),
                // set redirect to a 404 state
                $urlRouterProvider.otherwise('/404_error');

        });