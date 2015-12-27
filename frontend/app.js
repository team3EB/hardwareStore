// app.js
var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
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

        .state('addItem', {
            url: '/addItemForm',
            templateUrl: '/pages/newItemForm.html',
            controller: 'itemController'


        })

        .state('about', {
            url: '/about',
            templateUrl: '/pages/partial-about.html',
            controller: 'Catalogue'

        })

    .state('item', {
        url: '/catalogue/:id',
        templateUrl: '/pages/item.html',
        controller: 'itemController'

    });



});

routerApp.controller('Catalogue',  ['$scope', '$http', '$injector', function ($scope, $http, $injector) {

    $http.get('/catalogue').success(function (response) {
            $scope.items = response;
    });



}]);

routerApp.controller('itemController',  ['$scope', '$http','$rootScope','$state', '$stateParams', function ($scope,$http,$rootScope,$state, $stateParams){

    $scope.addItem = function(){
        console.log($scope.formData);
        $http.post('/catalogue', $scope.formData).success(function(response){
            console.log(response);
            $state.go('about');
        });

    };


        $http.get('/catalogue/567d413cd7ab66463b0e2687').success(function(response){
            $scope.item = response;
            console.log(response);

        });



}]);

