/**
 * Created by alexadam on 19.01.16.
 */

angular.module('routerApp.itemCtrl', [])

    .controller('itemController', ['$scope', '$http','$rootScope','$state', '$stateParams','$window', function ($scope,$http,$rootScope,$state, $stateParams, $window) {


        $http.get('/catalogue/' + $stateParams.id).success(function (response) {
            $scope.item = response;

        })

        $scope.addItem = function(){
            console.log($scope.item);
            $http.post('/api/catalogue', $scope.item).success(function(response){
                console.log(response);
                $state.go('catalogue');
            });

        };

        $scope.itemUpdate = function(){
            console.log($scope.item);
            $http.put('/api/catalogue/' + $stateParams.id, $scope.item).success(function(response){
                $scope.item = response;
                console.log(response);
                $state.go("item", { "id": $stateParams.id});

            });
        }

    }])
