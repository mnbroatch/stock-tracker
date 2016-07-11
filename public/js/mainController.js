"use strict;"

angular.module('stockTracker')
.controller('mainController', function($scope,userService) {

	$scope.logout = userService.logout;

});



