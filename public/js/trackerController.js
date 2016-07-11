"use strict;"

angular.module('stockTracker')
.controller('trackerController', function($scope,$state,stockService,userService,Portfolio) {

	$scope.stockInfoArray = [];
	$scope.stockArray = Portfolio.data.portfolio;
	console.log($scope.stockArray);
	$scope.stockInfoArray = $scope.stockArray.map( (el,ind)=>{
		stockService.getStock(el)
		.then(res=>{
			console.log(res);
			return res;
		})
	})

	$scope.delete = function(stock){
		userService.removeStock(stock)
		.then( function(){
			var index = $scope.stockArray.indexOf(stock);
			$scope.stockArray.splice(index,1);
		});
	}
});



