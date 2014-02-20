'use strict';

shoppingWhiz.controller('AccountController',
    function AccountController($scope, $location, authenticationService) {
        var currentUser = authenticationService.currentUser();
        if(currentUser.isLoggedIn()) {
            $location.url('/shoppingList'); 
        }

        $scope.login = function() {
            authenticationService.getToken($scope.user, function(status) {
                if(status === 200) {
                    $location.url('/shoppingList');
                }
            });
        }
    }
); 