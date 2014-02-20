'use strict';

shoppingWhiz.controller('ShoppingListController',
    function ShoppingListController($scope, $location, shoppingListService, authenticationService) {
        $scope.showError = { display: 'none' };

        authenticationService.authorizeUser();
        
        shoppingListService.getLists(function(data) {
            $scope.lists = data;
            setTotal(data);
        });

        function setTotal(data) {
            var total = 0;
            for(var i = 0; i < data.length; i++) {
                total += data[i].Total;
            }

            $scope.lists.Total = total;
        }

        $scope.addList = function() {
            $location.url('/newList');
        };

        $scope.deleteList = function(list) {
            shoppingListService.deleteList(list.Id, function(status) {
                if(status === 200) {
                    for(var i = 0; i < $scope.lists.length; i++) {
                        if($scope.lists[i].Id === list.Id) {
                            $scope.lists.splice(i, 1);
                            break;
                        }     
                    }
                    setTotal($scope.lists);
                } 
            });
        };

        $scope.saveList = function() {
            var list = $scope.list;
            if(list) {
                if(list.store && list.total) {
                    shoppingListService.saveList(list, function(status) {
                        if(status === 204) {
                            $location.url('/shoppingList');
                        }
                        else {
                            $scope.showError.display = 'inline';
                        }
                    });
                }    
            }    
        };

        $scope.editItem = function(item) {
            
        };

        function nextId() {
            return $scope.items.length + 1; 
        }        
    }
); 