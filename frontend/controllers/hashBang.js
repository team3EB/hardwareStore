/**
 * Created by alexadam on 19.01.16.
 */

angular.module('routerApp.hashBangURLs', []).config(['$locationProvider', function($location) {
    $location.hashPrefix('!');
}]);
