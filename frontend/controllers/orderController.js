/**
 * Created by alexadam on 19.01.16.
 */

angular.module('routerApp.orderCtrl', [])

    .controller('orderController',  ['$scope', '$http','$rootScope','$state', '$stateParams','$window', function ($scope,$http,$rootScope,$state, $stateParams,$window) {
        var sessioncart = function() {

            $scope.orderItems =  JSON.parse($window.sessionStorage[0]);

            console.log($scope.orderItems);


            var session_cart = new Array();
            var cart_count = new Array();

            for (var i = 0 ; i < $window.sessionStorage.length; i++) {
                session_cart.push(JSON.parse($window.sessionStorage.getItem(i)));
                $scope.totalprice += JSON.parse($window.sessionStorage.getItem(i)).total;
            }

            return session_cart;
        }

        $scope.ses = sessioncart();

        $scope.sendEmail = function() {

            $http.get('/emailtest/' + currUser.email).success(function (response) {
                $state.go('home', {reload: true});
            });

        }

        //$scope.finishOrder = function() {

            // $rootScope.$on('$stateChangeSuccess', function(event, toState) {

          //   console.log(currUser.email);


            //  });

            //if($window.localStorage['token'] == null) {

            //  $http.post('/signup', $scope.user).success(function (response) {
            // });

            // $http.post('/api/authenticate', $scope.user).success(function (response) {
            //    console.log($scope.user);
            //    $window.localStorage['token'] = response.token;
            //    console.log(response);
            // });

            //  }



          //  $http.post('/api/orders', $scope.orderItems).success(function (request, response) {
                //console.log($scope.orderItems);

           // });
       // }
    }])

