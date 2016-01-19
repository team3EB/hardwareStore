/**
 * Created by alexadam on 19.01.16.
 */


angular.module('routerApp.userCtrl', [])

    .controller('userController', ['$scope', '$http','$rootScope','$state', '$stateParams','$window', function ($scope,$http,$rootScope,$state, $stateParams, $window) {


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
                sessionStorage.clear();
                $state.go('home', {}, {reload: true});
            });

        };

    }])