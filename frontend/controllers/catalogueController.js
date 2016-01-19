/**
 * Created by alexadam on 19.01.16.
 */

angular.module('routerApp.catalogueCtrl', [])

    .controller('Catalogue', ['$scope', '$http','$rootScope','$state', '$stateParams','$window', function ($scope,$http,$rootScope,$state, $stateParams, $window) {

        $http.get('/api/catalogue').success(function (response) {
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
            $http.delete('/api/catalogue/'+id).success(function (response) {
                $scope.items = response;
            })
        }

        $scope.filter = function(content){

            console.log(content);
            $scope.type = content;

            if(content === 'All'){

                $http.get('/api/catalogue/').success(function (response) {
                    console.log($scope.example);
                    $scope.items = response;
                })

            }else{

                $http.get('/api/catalogue/' + $scope.type).success(function (response) {
                    console.log($scope.example);
                    $scope.items = response;
                })
            }

        }


        if ($state.includes('item')){
            //console.log($stateParams.id);
            $http.get('/api/catalogue/' + $stateParams.id).success(function (response) {
                $scope.item = response;
                console.log(response);
            });
        }

        if ($state.includes('itemUpdate')){
            //console.log($stateParams.id);
            $http.get('/api/catalogue/' + $stateParams.id).success(function (response) {
                $scope.item = response;
                console.log(response);
            });
        }

    }])

