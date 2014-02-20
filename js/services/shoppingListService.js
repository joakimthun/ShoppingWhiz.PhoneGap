'use strict';

shoppingWhiz.factory('shoppingListService', function($http, urlHelper, authenticationService) {
        return {
            getLists: function(callback) {
                $http.get(urlHelper.getRequestUrl('/api/shoppinglist'))
                .success(function(data, status, headers, config) {
                    callback(data);
                })
                .error(function(data, status, headers, config) {
                });
            },
            saveList: function(list, callback) {
                $http.post(urlHelper.getRequestUrl('/api/shoppinglist'), list, { headers: { 'Content-Type': 'application/json' }})
                .success(function(data, status, headers, config) {
                    callback(status);
                })
                .error(function(data, status, headers, config) {
                    callback(status);
                });
            },
            deleteList: function(id, callback) {
                $http.delete(urlHelper.getRequestUrl('/api/shoppinglist/' + id))
                .success(function(data, status, headers, config) {
                    callback(200);
                })
                .error(function(data, status, headers, config) {
                    callback(status);
                });
            }
        };
});