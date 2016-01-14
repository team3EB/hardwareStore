// app.js
var routerApp = angular.module('routerApp', ['ui.router']);
var item_id;
var cart = new Array();


routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider



        // HOME STATES AND NESTED VIEWS ========================================
    $stateProvider.state('home', {

                    url: '/home',
                    templateUrl: '/pages/partial-home.html'

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
            controller: 'itemController'


        })


        .state('itemUpdate', {
            url: '/catalogue/:id/update',
            templateUrl: '/pages/updateForm.html',
            controller: 'itemController'

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

        $stateProvider.state('notFound', {
        url: '{path:.*}',
        templateUrl: '/pages/partial-home.html'
        });




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

