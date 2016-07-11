"use strict;"

angular.module('stockTracker')
.controller('viewoneController', function($scope,$http,$stateParams,userService,stockService) {

console.log('ym',$stateParams.symbol);

	stockService.getStock($stateParams.symbol)
	.then(res=>{
		console.log('res',res);
		$scope.stock = res;
	});

	$scope.saveStock = function(){
		userService.saveStock($scope.stock.Symbol);
	}




});

