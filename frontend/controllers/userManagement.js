/**
 * Created by alexadam on 19.01.16.
 */

angular.module('routerApp.userManCtrl', [])

    .controller('userManagement', ['$scope', '$http','$rootScope','$state', '$stateParams','$window', function ($scope,$http,$rootScope,$state, $stateParams, $window) {


        $http.get('/api/users').success(function (response) {
            $scope.users = response;
        })

        $scope.getUser = function(index){

            user_id =  index;
            console.log(user_id);


            $state.go('userUpdate', { "id": user_id});
        }

        $scope.userUpdate = function(){
            console.log($scope.user);
            $http.put('/api/users/' + $stateParams.id, $scope.user).success(function(response){
                $scope.user = response;
                console.log(response);
                $state.go("userManagement");

            });
        }

        $scope.deleteUser = function(id){
            console.log(id);
            $http.delete('/api/users/'+id);
            $window.location.reload();
        }




        if ($state.includes('userUpdate')){

            $http.get('/api/users/' + user_id).success(function (response) {
                $scope.user = response;
                console.log(response);
            });

        }


    }])

    .factory('httpRequestInterceptor', ['$window', function ($window) {
        return {
            request: function (config) {

                config.headers['x-access-token'] = $window.localStorage['token'];

                return config;
            }
        };
    }])
