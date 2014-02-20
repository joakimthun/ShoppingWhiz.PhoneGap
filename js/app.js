'use strict';

var shoppingWhiz = angular.module('shoppingWhiz', ['ngRoute', 'ngResource']);

shoppingWhiz.factory('httpRequestInterceptor', function () {
  return {
    request: function (config) {
      var db = window.localStorage;
      config.headers.Authorization = 'Bearer ' + db.getItem('token');
      return config;
    }
  };
});

shoppingWhiz.config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
        .when('/',
            {
                controller: 'AccountController',
                templateUrl: 'js/templates/login.html'
            })
        .when('/signup',
            {
                controller: 'AccountController',
                templateUrl: 'js/templates/signup.html'
            })
        .when('/shoppingList',
            {
                controller: 'ShoppingListController',
                templateUrl: 'js/templates/shoppingList.html'
            })
        .when('/newList',
            {
                controller: 'ShoppingListController',
                templateUrl: 'js/templates/newList.html'
            })
        .otherwise({ redirectTo: '/' });

    $httpProvider.interceptors.push('httpRequestInterceptor');

        //$locationProvider.html5Mode(true);
    });