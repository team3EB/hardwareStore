/**
 * Created by alexadam on 19.01.16.
 */

angular.module('routerApp.orderCtrl', [])

.controller('orderController',  ['$scope', '$http','$rootScope','$state', '$stateParams','$window', function ($scope,$http,$rootScope,$state, $stateParams,$window) {
    var sessioncart = function() {
        $scope.orderItems =  new Array();
        var session_cart = new Array();

        for(var i = 0; i<$window.sessionStorage.length; i++)
            $scope.orderItems.push({"id" : JSON.parse($window.sessionStorage.getItem(i))._id, "count" : JSON.parse($window.sessionStorage[i]).count});

        for (var i = 0 ; i < $window.sessionStorage.length; i++) {
            session_cart.push(JSON.parse($window.sessionStorage.getItem(i)));
            $scope.totalprice += JSON.parse($window.sessionStorage.getItem(i)).total;
        }

        return session_cart;
    }
    $scope.ses = sessioncart();


    $scope.finishOrder = function() {


        $scope.orderList = new Array();
        $scope.orderList.push({"user_id" : currUser._id, "city" : $scope.order.city, "country" : $scope.order.country, "name" : $scope.order.name, "address" : $scope.order.address, "zip" : $scope.order.zip});
        $scope.orderList.push($scope.orderItems);


        $http.post('/api/orders', $scope.orderList).success(function (request, response) {

        });

        sessionStorage.clear();

        $state.go('profile', {reload: true});

    }

        $scope.sendEmail = function() {

            $http.get('/emailtest/' + currUser.email).success(function (response) {
            });

        }




}])





