// app.js
var routerApp = angular.module('routerApp', ['ui.router', 'angular-jwt']);
var item_id;
var user_id;
var currUser;
var cart = new Array();


routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider



    // HOME STATES AND NESTED VIEWS ========================================
    $stateProvider.state('home', {

        url: '/home',
        templateUrl: '/pages/partial-home.html',

    })
        .state('home.cart', {

            url: '/home/cart',
            templateUrl: '/pages/partial-home.html'

        })


        // nested list with custom controller
        .state('home.list', {
            url: '/list',
            templateUrl: '/pages/partial-home-list.html',
            controller: function($scope) {
                $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
            }
        })

        // nested list with just some random string data
        .state('home.paragraph', {
            url: '/paragraph',
            template: 'I could sure use a drink right now.'
        })


        .state('catalogue', {
            url: '/catalogue',
            templateUrl: '/pages/partial-about.html',
            controller: 'Catalogue'

        })


        .state('addItem', {
            url: '/addItemForm',
            templateUrl: '/pages/newItemForm.html',
            controller: 'itemController',
            authenticate: true


        })


        .state('itemUpdate', {
            url: '/catalogue/:id/update',
            templateUrl: '/pages/updateForm.html',
            controller: 'itemController',
            authenticate: true

        })

        .state('cart', {
            url: '/cart',
            templateUrl: '/pages/cart.html',
            controller: 'cartController'

        })
        .state('admin', {
            url: '/admin',
            templateUrl: '/pages/admin/admin.html',
            controller: 'userController'

        })
        .state('order', {
            url: '/order',
            templateUrl: '/pages/order.html',
            controller: 'orderController'

        })


        .state('item', {
            url: '/catalogue/:id',
            templateUrl: '/pages/item.html',
            controller: 'Catalogue'

        })

        .state('registerUser', {
            url: '/user/register',
            templateUrl: '/pages/registrationForm.html',
            controller: 'userController'

        })

        .state('login', {
            url: '/login',
            templateUrl: '/pages/login.html',
            controller: 'userController'

        })

        .state('userManagement', {
            url: '/userManagement',
            templateUrl: '/pages/admin/userManagement.html',
            controller: 'userManagement'

        })

        .state('userUpdate', {
            url: '/user/:id',
            templateUrl: '/pages/admin/userUpdateForm.html',
            controller: 'userManagement'

        })


});


routerApp.controller('Catalogue', ['$scope', '$http','$rootScope','$state', '$stateParams','$window', function ($scope,$http,$rootScope,$state, $stateParams, $window) {

    $http.get('/catalogue').success(function (response) {
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
        $http.delete('/catalogue/'+id);
        $window.location.reload();
    }


    if ($state.includes('item')){
        //console.log($stateParams.id);
        $http.get('/catalogue/' + $stateParams.id).success(function (response) {
            $scope.item = response;
            console.log(response);
        });
    }

    if ($state.includes('itemUpdate')){
        //console.log($stateParams.id);
        $http.get('/catalogue/' + $stateParams.id).success(function (response) {
            $scope.item = response;
            console.log(response);
        });
    }




}]);


routerApp.controller('itemController', ['$scope', '$http','$rootScope','$state', '$stateParams','$window', function ($scope,$http,$rootScope,$state, $stateParams, $window) {


    $http.get('/catalogue/' + $stateParams.id).success(function (response) {
        $scope.item = response;

    })

    $scope.addItem = function(){
        console.log($scope.item);
        $http.post('/catalogue', $scope.item).success(function(response){
            console.log(response);
            $state.go('catalogue');
        });

    };

    $scope.itemUpdate = function(){
        console.log($scope.item);
        $http.put('/catalogue/' + $stateParams.id, $scope.item).success(function(response){
            $scope.item = response;
            console.log(response);
            $state.go("item", { "id": $stateParams.id});

        });
    }

}]);


routerApp.controller('userController', ['$scope', '$http','$rootScope','$state', '$stateParams','$window', function ($scope,$http,$rootScope,$state, $stateParams, $window) {


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

}]);

routerApp.controller('userManagement', ['$scope', '$http','$rootScope','$state', '$stateParams','$window', function ($scope,$http,$rootScope,$state, $stateParams, $window) {


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
        $http.delete('/users/'+id);
        $window.location.reload();
    }




    if ($state.includes('userUpdate')){

        $http.get('/api/users/' + user_id).success(function (response) {
            $scope.user = response;
            console.log(response);
        });

    }


}]);

routerApp.factory('httpRequestInterceptor', ['$window', function ($window) {
    return {
        request: function (config) {

            config.headers['x-access-token'] = $window.localStorage['token'];

            return config;
        }
    };
}]);


routerApp.controller('cartController',  ['$scope', '$http','$rootScope','$state', '$stateParams','$window', function ($scope,$http,$rootScope,$state, $stateParams,$window){



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

}]);

routerApp.controller('orderController',  ['$scope', '$http','$rootScope','$state', '$stateParams','$window', function ($scope,$http,$rootScope,$state, $stateParams,$window) {
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

    $scope.finishOrder = function() {

       // $rootScope.$on('$stateChangeSuccess', function(event, toState) {

           // console.log(currUser._id);
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



        $http.post('/api/orders', $scope.orderItems).success(function (request, response) {
            //console.log($scope.orderItems);

          });
    }
}]);

routerApp.factory('httpRequestInterceptor', ['$window', function ($window) {
    return {
        request: function (config) {

            config.headers['x-access-token'] = $window.localStorage['token'];

            return config;
        }
    };
}]);

routerApp.config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpRequestInterceptor');
});

routerApp.run(function($rootScope, $state, $location, $timeout,$window, jwtHelper) {
    $rootScope.$on('$stateChangeSuccess', function(event, toState){

        currUser = jwtHelper.decodeToken($window.localStorage['token']);
        var checkRole = jwtHelper.decodeToken($window.localStorage['token']);
        var role = checkRole['role'];

        if(role === 'admin') {
            $rootScope.admin = true;
        }else{
            $rootScope.admin = false;
        }
    });
});