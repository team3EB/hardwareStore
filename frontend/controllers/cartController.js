/**
 * Created by alexadam on 19.01.16.
 */

angular.module('routerApp.cartCtrl', [])

    .controller('cartController',  ['$scope', '$http','$rootScope','$state', '$stateParams','$window', function ($scope,$http,$rootScope,$state, $stateParams,$window){

        $scope.count = $window.sessionStorage.length;
        $scope.totalprice = 0;

        var sessioncart = function() {

            var session_cart = new Array();
            var cart_count = new Array();

            for (var i = 0 ; i < $window.sessionStorage.length; i++) {
                session_cart.push(JSON.parse($window.sessionStorage.getItem(i)));
                $scope.totalprice += JSON.parse($window.sessionStorage.getItem(i)).total;
            }

            return session_cart;
        }

        $scope.ses = sessioncart();
        /*

         $scope.myDirectiveData = [
         { title: "First title", content: "First content" },
         { title: "Second title", content: "Second content" }
         ];

         */

        var refresh = function(){
            $scope.count = $window.sessionStorage.length;
            var counter=0;

            if($window.sessionStorage.length > 0)
                for(var i =0;i< $window.sessionStorage.length;i++)
                    counter+=JSON.parse($window.sessionStorage.getItem(i)).count;

            $('#cart').text(counter);

        }
        refresh();

        $scope.addToCart = function(id){

            $http.get('/catalogue/'+id).success(function(res){

                if($window.sessionStorage.length == 0) {
                    res['count']=1;
                    res['total']=res.price;
                    $window.sessionStorage.setItem($scope.count, JSON.stringify(res));
                }
                else{
                    var existence = false;
                    for(var i =0;i< $window.sessionStorage.length;i++)
                        if(JSON.parse($window.sessionStorage.getItem(i))._id == res._id) {
                            console.log(JSON.parse($window.sessionStorage.getItem(i)).count);
                            res['count'] = ++JSON.parse($window.sessionStorage.getItem(i)).count;
                            res['total'] = res.price * res.count;

                            console.log(res);
                            $window.sessionStorage.setItem(i, JSON.stringify(res));
                            existence = true;
                        }
                    if(!existence){
                        res['count']=1;
                        res['total']=res.price;
                        $window.sessionStorage.setItem($scope.count, JSON.stringify(res));
                    }

                }

                $scope.count = $window.sessionStorage.length;
                refresh();
            });

        };

        $scope.checkout = function() {
            $state.go('order');
        }

        $scope.removeFromCart = function(ses_id) {
            for (var i = 0; i < $window.sessionStorage.length; i++) {
                if (JSON.parse($window.sessionStorage.getItem(i))._id == ses_id) {
                    $window.sessionStorage.removeItem(i);




                    $state.go('cart', {}, {reload: true});



                }
            }


            console.log(  $window.sessionStorage);
            // $window.sessionStorage.clear();
            //  for(var i =0;i< tempStorage.length;i++) {
            //    console.log('Hallo' + JSON.parse(tempStorage.getItem(i)));
            // if (!JSON.parse($window.sessionStorage.getItem(i))._id == ses_id)


            //}
            //console.log("true");
            //  console.log(JSON.parse($window.sessionStorage.getItem(i)));
            //$window.sessionStorage.clear();
        }

        $scope.cart = function () {


            $state.go('cart');




        };

    }])
