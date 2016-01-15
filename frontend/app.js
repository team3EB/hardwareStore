// app.js
var routerApp = angular.module('routerApp', ['ui.router', 'angular-jwt']);
var item_id;
var cart = new Array();


routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider



        // HOME STATES AND NESTED VIEWS ========================================
    $stateProvider.state('home', {

                    url: '/home',
                    templateUrl: '/pages/partial-home.html',

        })
        .state('home.cart', {

            url: '/home/cart',
            templateUrl: '/pages/partial-home.html'

        })


        // nested list with custom controller
        .state('home.list', {
            url: '/list',
            templateUrl: '/pages/partial-home-list.html',
            controller: function($scope) {
                $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
            }
        })

        // nested list with just some random string data
        .state('home.paragraph', {
            url: '/paragraph',
            template: 'I could sure use a drink right now.'
        })


        .state('catalogue', {
            url: '/catalogue',
            templateUrl: '/pages/partial-about.html',
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


        .state('item', {
            url: '/catalogue/:id',
            templateUrl: '/pages/item.html',
            controller: 'Catalogue'

        })

        .state('registerUser', {
            url: '/user/register',
            templateUrl: '/pages/registrationForm.html',
            controller: 'userController'

        })

        .state('login', {
            url: '/login',
            templateUrl: '/pages/login.html',
            controller: 'userController'

        })






});
routerApp.controller('Catalogue', ['$scope', '$http','$rootScope','$state', '$stateParams','$window', function ($scope,$http,$rootScope,$state, $stateParams, $window) {

    $http.get('/catalogue').success(function (response) {
        $scope.items = response;
    })

    $scope.getItem = function(index, update){
        item_id =  index;
        console.log(update);
        if(update==true){
            console.log('1');
            $state.go("itemUpdate", { "id": index});
        } else{
            console.log('2');
            $state.go("item", { "id": index});
        }


    }
    $scope.remove = function(id){
        console.log(id);
        $http.delete('/catalogue/'+id);
        $window.location.reload();
    }


    if ($state.includes('item')){
        //console.log($stateParams.id);
        $http.get('/catalogue/' + $stateParams.id).success(function (response) {
            $scope.item = response;
            console.log(response);
        });
    }

    if ($state.includes('itemUpdate')){
        //console.log($stateParams.id);
        $http.get('/catalogue/' + $stateParams.id).success(function (response) {
            $scope.item = response;
            console.log(response);
        });
    }




}]);


routerApp.controller('itemController', ['$scope', '$http','$rootScope','$state', '$stateParams','$window', function ($scope,$http,$rootScope,$state, $stateParams, $window) {


    $http.get('/catalogue/' + $stateParams.id).success(function (response) {
        $scope.item = response;

    })

    $scope.addItem = function(){
        console.log($scope.item);
        $http.post('/catalogue', $scope.item).success(function(response){
            console.log(response);
            $state.go('catalogue');
        });

    };

    $scope.itemUpdate = function(){
            console.log($scope.item);
            $http.put('/catalogue/' + $stateParams.id, $scope.item).success(function(response){
            $scope.item = response;
            console.log(response);
            $state.go("item", { "id": $stateParams.id});

        });
    }

}]);


routerApp.controller('userController', ['$scope', '$http','$rootScope','$state', '$stateParams','$window', function ($scope,$http,$rootScope,$state, $stateParams, $window) {


    $scope.registerUser = function(){
        console.log($scope.item);
        $http.post('/signup', $scope.user).success(function(response){
            console.log($scope.user);
            $state.go('home');
        });

    };

    $scope.loginUser = function(){
        console.log($scope.user);
        $http.post('/api/authenticate', $scope.user).success(function(response){
            console.log($scope.user);
            $window.localStorage['token'] = response.token;
            console.log(response);
            $state.go('home', {}, {reload: true});
        });

    };

}]);


routerApp.controller('cartController',  ['$scope', '$http','$rootScope','$state', '$stateParams','$window', function ($scope,$http,$rootScope,$state, $stateParams,$window){



    $scope.count = $window.sessionStorage.length;

    var sessioncart = function() {

        var session_cart = new Array();

        for (var i = 0 ; i < $window.sessionStorage.length; i++) {

                session_cart.push(JSON.parse($window.sessionStorage.getItem(i)));
                session_cart[i].ses_id = i;


        }
        return session_cart;
    }

   $scope.ses = sessioncart();
/*

 $scope.myDirectiveData = [
 { title: "First title", content: "First content" },
 { title: "Second title", content: "Second content" }
 ];

*/

var refresh = function(){
    $scope.count = $window.sessionStorage.length;
    $('#cart').text($scope.count);

}
refresh();

    $scope.addToCart = function(id){


        $http.get('/catalogue/'+id).success(function(res){
         //   $window.sessionStorage.setItem($scope.count, JSON.stringify(res));
            $window.sessionStorage.setItem($scope.count, JSON.stringify(res));
            $scope.count = $window.sessionStorage.length;
            refresh();
        });

    };

    $scope.removeFromCart = function(ses_id){
        $window.sessionStorage.removeItem(ses_id);
    }

    $scope.cart = function () {

        $state.go('cart');




    };

}]);

routerApp.factory('httpRequestInterceptor', ['$window', function ($window) {
    return {
        request: function (config) {

            config.headers['x-access-token'] = $window.localStorage['token'];

            return config;
        }
    };
}]);

routerApp.config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpRequestInterceptor');
});

routerApp.run(function($rootScope, $state, $location, $timeout,$window, jwtHelper) {
    $rootScope.$on('$stateChangeSuccess', function(event, toState){

        var checkRole = jwtHelper.decodeToken($window.localStorage['token']);
        var role = checkRole['role'];

        if(role === 'admin') {
            $rootScope.admin = true;
        }else{
            $rootScope.admin = false;
        }
    });
});
