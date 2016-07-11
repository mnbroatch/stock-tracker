"use strict;"

angular.module('stockTracker')
.controller('searchController', function($scope,$state,stockService) {

	$scope.stockArray = [];
	$scope.search = function(searchTerm){
		stockService.search(searchTerm)
		.then(res=>{
			$scope.stockArray = res;
		})
	}
});



