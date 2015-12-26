var myApp = angular.module('myApp', []);
myApp.controller('ItemsControll', ['$scope', '$http', '$location', function($scope, $http, $location) {
    console.log("Hello World from controller");

    $http.get('/items').success(function (response) {
        console.log("i've got data");
        $scope.items = response;
    });

    $scope.addItem = function(){
      console.log($scope.item);
        $http.post('/items', $scope.item).success(function(response){
            console.log(response);
        });
    };



$scope.openItem = function (id) {
    $http.get('/catalogue/item/' + id).success(function(response){
        $scope.item = response;
        console.log(response);
        response.render('/item.html');

    });

};

}]);

