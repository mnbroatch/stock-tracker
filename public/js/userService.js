"use strict;"


angular.module('stockTracker')
.service('userService', function($http,$cookies,$rootScope,TOKENNAME,$state){



	this.getPortfolio = () => {
		return $http.get('/api/users/portfolio');
	};

	this.saveStock = symbol => {
		return $http({
			method:'PUT',
			url: '/api/users/save/' + symbol,
		})
		.then( res => {
			if (res.data){
				return res.data;
			}
		})
		.catch(err => {console.log('err: ', err)});
	}

	this.removeStock = symbol => {
		return $http({
			method:'PUT',
			url: '/api/users/remove/' + symbol,
		})
		.then( res => {
			if (res.data){
				return res.data;
			}
		})
		.catch(err => {console.log('err: ', err)});
	}



















this.readToken = () => {
	let token = $cookies.get(TOKENNAME);

	if(typeof token === 'string') {
		let payload = JSON.parse(atob(token.split('.')[1]));
		$rootScope.currentUser = payload;
	}
};

this.register = userObj => {
	return $http.post('/api/users/register', userObj);
};

this.login = userObj => {
	return $http.post('/api/users/login', userObj)  
	.then(res => {
		$rootScope.currentUser = res.data;
		return res;
	});
};

this.logout = () => {
	$cookies.remove(TOKENNAME);
	$rootScope.currentUser = null;
	$state.go('home');
};

















this.getAll = () => {
	return $http({
		method:'GET',
		url: '/api/users'
	})
	.then( res => {
		if (res.data.length)
			return res.data;
	})
	.catch(err => {
		console.log('err: ', err);
	});
}

this.addOne = (user) => {
	return $http({
		method:'POST',
		url: '/api/users',
		data: user
	})
	.then( res => {
		if (res.data){
			return res.data;
		}
	})
	.catch(err => {console.log('err: ', err)});
}

this.removeOne = (user) => {
	return $http({
		method:'DELETE',
		url: '/api/users/' + user._id
	});
}

this.editOne = (user) => {
	return $http({
		method:'PUT',
		url: '/api/users/' + user._id,
		data: user
	})
	.then( res => {
		if (res.data){
			return res.data;
		}
	})
	.catch(err => {console.log('err: ', err)});
}


});

