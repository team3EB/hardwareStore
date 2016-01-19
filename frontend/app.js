// app.js

'use strict';

var item_id;
var user_id;
var currUser = null;
var cart = new Array();

angular.module('routerApp', ['ui.router', 'angular-jwt', 'routerApp.catalogueCtrl', 'routerApp.itemCtrl', 'routerApp.userCtrl',
    'routerApp.userManCtrl', 'routerApp.cartCtrl', 'routerApp.orderCtrl', 'routerApp.mainPageCtrl', 'routerApp.hashBangURLs', 'routerApp.profileCtrl', 'routerApp.orderManagementCtrl'])



.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider



    // HOME STATES AND NESTED VIEWS ========================================
    $stateProvider.state('home', {

        url: '/home',
        templateUrl: '/pages/mainView.html',
        controller: 'mainPageController'

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
        .state('oneorder', {
            url: '/order/:id',
            templateUrl: '/pages/oneOrder.html',
            controller: 'profileController',


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
        .state('profile', {
            url: '/profile',
            templateUrl: '/pages/profile.html',
            controller: 'profileController'


        })
        .state('login', {
            url: '/login',
            templateUrl: '/pages/loginPage.html',
            controller: 'userController'

        })

        .state('logout', {
            url: '/logout',
            templateUrl: '/pages/mainView.html',
            controller: 'mainPageController'

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

        .state('commercialOffer', {
            url: '/commOffer',
            templateUrl: '/pages/commOffer.html',

        })

        .state('orderManagement', {
            url: '/orders',
            templateUrl: '/pages/orderManagement.html',
            controller: 'orderManagementCtrl'

        })



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

        var role = null;
        $rootScope.loggedIn = false;

        if($window.localStorage['token']!=0){
            currUser = jwtHelper.decodeToken($window.localStorage['token']);
            var checkRole = jwtHelper.decodeToken($window.localStorage['token']);
            var role = checkRole['role'];
            $rootScope.loggedIn=true;
        }else{
            $rootScope.loggedIn = false;
        }

        if(role === 'b2b') {
            $rootScope.b2b = true;
        }else{
            $rootScope.b2b = false;
        }

        if(role === 'admin') {
            $rootScope.admin = true;
        }else{
            $rootScope.admin = false;
        }
    });
});