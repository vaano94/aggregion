// apiService.js
angular
    .module('app')
    .factory('apiService', apiService);

function apiService(api, $resource) {

    return {
        /**
         * @desc Calls for all catalog entries
         * @return Array of Resource objects
         */
        getAll: function () { 
            return $resource(api.BASE_ADDRESS + "/public/catalog",
             {},
                    {
                        get: { method:'GET', isArray:true },
                        interceptor: ['customHttpInterceptor']
                    }
            );
        },
         /**
         * @desc Calls API for a scecific book data
         * @param id - book ID
         * @return Resource object
         */
        getById: function (id) {
            
            return $resource(api.BASE_ADDRESS + "/public/catalog/:bookId", 
            {bookId : id},
                {
                        get: { method:'GET', isArray:false, isObject: true },
                        interceptor: ['customHttpInterceptor']
                }
            )
                
        },

         /**
         * @desc Calls for all book bundles
         * @ param id - book ID
         * @return Array of Resource objects
         */
        getBundles: function(id) {
            return $resource(api.BASE_ADDRESS + "/public/catalog/:bookId/bundles/", 
            {bookId: id},
                {
                    get: { method:'GET', isArray:true},
                    interceptor: ['customHttpInterceptor']
                }
            )
        }, 

        /**
         * @decs Returns a link to download book cover image
         * @param id - book id
         */
        composeImageLink(id) {
            return 'https://storage.aggregion.com/api/files/'+id+'/shared/data';
        }

        // failed attempt - Somehow all images are replaced to one
        // composeImageLink: function(value) {
        //     return $resource('https://storage.aggregion.com/api/files/'+value+'/shared/data', 
        //        {  
        //            get: { method : 'GET' }     
        //        }
        //    )
        //    .get();
        // }
    }

}
