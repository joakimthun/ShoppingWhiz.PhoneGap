'use strict';

shoppingWhiz.factory('authenticationService', function($http, $resource, $location, urlHelper) {
    var db = window.localStorage;

    function getTokenRequestData(user) {
        return 'grant_type=password&username=' + user.name + '&password=' + user.password;
    }

    function setCurrentUser(userData) {
        db.setItem('token', userData.access_token);
        db.setItem('token_expires_in', userData.expires_in);
        db.setItem('currentUser', userData.userName);
    }

    return {
        getToken: function(user, callback) {
            var status = 401;
            $http.post(urlHelper.getRequestUrl('/Token'), getTokenRequestData(user), {
                'headers': {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).
            success(function(data, status, headers, config) {
                setCurrentUser(data);
                callback(status);
            }).
            error(function(data, status, headers, config) {
                callback(status);
            });
        },
        currentUser: function() {
            return {
                'token': db.getItem('token'),
                'token_expires_in' : db.getItem('token_expires_in'),
                'currentUser' : db.getItem('currentUser'),
                'isLoggedIn': function() {
                    return this.token != null && this.currentUser != null;
                }
            }
        },
        getAuthorizationHeader: function() {
            return 'Bearer ' + db.getItem('token');
        },
        authorizeUser: function() {
            if(db.getItem('token') == null || db.getItem('currentUser') == null) {
                $location.url('/');
            }
        }
    };
});
