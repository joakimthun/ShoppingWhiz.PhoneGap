'use strict';

shoppingWhiz.factory('urlHelper', function() {
        var apiUrl = 'http://shoppingwhizapi.azurewebsites.net';
        //var apiUrl = 'http://localhost:51531';

        return {
            getRequestUrl: function(route) {
                return apiUrl + route;
            }
        };
});