"use strict;"

angular.module('stockTracker')
.service('stockService', function($http){





	this.search = searchTerm => {
		return $http({
			method:'JSONP',
			url: 'http://dev.markitondemand.com/Api/v2/Lookup/jsonp?input=' + searchTerm,
			params: {callback:'JSON_CALLBACK'}
		})
		.then( res => {
			if (res.data)
			console.log(res.data);
				return res.data;
		})
		.catch(err => {
			console.log('err: ', err);
		});
	}

	this.getStock = symbol => {
		return $http({
			method:'JSONP',
			url: 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' + symbol,
			params: {callback:'JSON_CALLBACK'}
		})
		.then( res => {
			if (res.data)
			console.log(res.data);
				return res.data;
		})
		.catch(err => {
			console.log('err: ', err);
		});
	}

	this.getAll = () => {

		return $http({
			method:'GET',
			url: '/api/stocks'
		})
		.then( res => {
			if (res.data.length)
				return res.data;
		})
		.catch(err => {
			console.log('err: ', err);
		});
	}

	this.addOne = (stock) => {
		return $http({
			method:'POST',
			url: '/api/stocks',
			data: stock
		})
		.then( res => {
			if (res.data){
				return res.data;
			}
		})
		.catch(err => {console.log('err: ', err)});
	}

	this.removeOne = (stock) => {
		return $http({
			method:'DELETE',
			url: '/api/stocks/' + stock._id
		});
	}

	this.editOne = (stock) => {
		return $http({
			method:'PUT',
			url: '/api/stocks/' + stock._id,
			data: stock
		})
		.then( res => {
			if (res.data){
				return res.data;
			}
		})
		.catch(err => {console.log('err: ', err)});
	}


});

