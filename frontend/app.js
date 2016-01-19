// app.js

'use strict';

var item_id;
var user_id;
var currUser;
var cart = new Array();

angular.module('routerApp', ['ui.router', 'angular-jwt', 'routerApp.catalogueCtrl', 'routerApp.itemCtrl', 'routerApp.userCtrl',
    'routerApp.userManCtrl', 'routerApp.cartCtrl', 'routerApp.orderCtrl'])



.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider



    // HOME STATES AND NESTED VIEWS ========================================
    $stateProvider.state('home', {

        url: '/home',
        templateUrl: '/pages/mainView.html',

    })
        .state('home.cart', {

            url: '/home/cart',
            templateUrl: '/pages/mainView.html'

        })


       // nested list with just some random string data
        .state('home.paragraph', {
            url: '/paragraph',
            template: 'I could sure use a drink right now.'
        })


        .state('catalogue', {
            url: '/catalogue',
            templateUrl: '/pages/cataloguePage.html',
            controller: 'Catalogue'

        })


        .state('addItem', {
            url: '/addItemForm',
            templateUrl: '/pages/newItemForm.html',
            controller: 'itemController',
            authenticate: true


        })


        .state('itemUpdate', {
            url: '/catalogue/:id/update',
            templateUrl: '/pages/updateForm.html',
            controller: 'itemController',
            authenticate: true

        })

        .state('cart', {
            url: '/cart',
            templateUrl: '/pages/cart.html',
            controller: 'cartController'

        })
        .state('admin', {
            url: '/admin',
            templateUrl: '/pages/admin/admin.html',
            controller: 'userController'

        })
        .state('order', {
            url: '/order',
            templateUrl: '/pages/order.html',
            controller: 'orderController'

        })


        .state('item', {
            url: '/catalogue/:id',
            templateUrl: '/pages/itemPage.html',
            controller: 'Catalogue'

        })

        .state('registerUser', {
            url: '/user/register',
            templateUrl: '/pages/registrationForm.html',
            controller: 'userController'

        })

        .state('login', {
            url: '/login',
            templateUrl: '/pages/loginPage.html',
            controller: 'userController'

        })

        .state('userManagement', {
            url: '/userManagement',
            templateUrl: '/pages/admin/userManagement.html',
            controller: 'userManagement'

        })

        .state('userUpdate', {
            url: '/user/:id',
            templateUrl: '/pages/admin/userUpdateForm.html',
            controller: 'userManagement'

        })

        $locationProvider.html5Mode(true);


    })


.factory('httpRequestInterceptor', ['$window', function ($window) {
    return {
        request: function (config) {

            config.headers['x-access-token'] = $window.localStorage['token'];

            return config;
        }
    };
}])

.config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpRequestInterceptor');
})

.run(function($rootScope, $state, $location, $timeout,$window, jwtHelper) {
    $rootScope.$on('$stateChangeSuccess', function(event, toState){

        currUser = jwtHelper.decodeToken($window.localStorage['token']);
        var checkRole = jwtHelper.decodeToken($window.localStorage['token']);
        var role = checkRole['role'];
        //var roleEC = currUser._doc.role;

        if(role === 'admin') {
            $rootScope.admin = true;
        }else{
            $rootScope.admin = false;
        }
    });
});