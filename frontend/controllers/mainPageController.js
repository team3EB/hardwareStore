/**
 * Created by alexadam on 19.01.16.
 */

angular.module('routerApp.mainPageCtrl', [])

    .controller('mainPageController', ['$scope', '$http','$rootScope','$state', '$stateParams','$window', function ($scope,$http,$rootScope,$state, $stateParams, $window) {

        $scope.logoutUser = function() {


            $window.localStorage.clear();
            sessionStorage.clear();
            currUser = null;

        };


    }])