/**
 * Created by alexadam on 19.01.16.
 */

angular.module('routerApp.orderManagementCtrl', [])

    .controller('orderManagementCtrl', ['$scope', '$http','$rootScope','$state', '$stateParams','$window', function ($scope,$http,$rootScope,$state, $stateParams, $window) {


        $http.get('/api/orders/').success(function (response) {
            $scope.orders = response;

        })

    }])
