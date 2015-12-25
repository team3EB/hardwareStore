var myApp = angular.module('myApp', []);
myApp.controller('ItemsControll', ['$scope', '$http', function($scope, $http) {
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

    $http.put('/items').success(function(req){
       console.log('im in get put controller');
    });


}]);

