/**
 * Created by andrefedorenko on 19.01.16.
 */

angular.module('routerApp.profileCtrl', [])

    .controller('profileController', ['$scope', '$http','$rootScope','$state', '$stateParams','$window', function ($scope,$http,$rootScope,$state, $stateParams, $window) {


        $http.get('/api/orders').success(function (response) {

                console.log(response);
            $scope.orders = new Array();

            for(var i=0;i<response.length;i++) {

                if(response[i].User_id != null && response[i].User_id == currUser._id)
                    $scope.orders.push(response[i]);
            }

          //  $scope.orders = response;

        //    angular.forEach($scope.orders, function(order){
          //      console.log(order.orders);
           // })

        })

        $scope.oneOrder = function (order_id) {

            $http.get('/api/order/' + order_id).success(function (response) {
                console.log(response);
                $scope.order = response;
                $state.go('oneorder', {id: order_id});


            })

        }




    }])