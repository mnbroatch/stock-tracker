"use strict;"

angular.module('stockTracker')
.controller('loginRegisterController', function($scope,$state,userService) {

	$scope.currentState = $state.current.name;

	$scope.submit = () => {
		console.log('$scope.user:', $scope.user);

		if($scope.currentState === 'login') {
			// login stuff
			userService.login($scope.user)
			.then(res => {
				$state.go('home');
			})
			.catch(err => {
				console.log('err:', err);
				alert('Register failed. Error in console.');
			});
		} else {
			// register stuff

			if($scope.user.password !== $scope.user.password2) {
				// passwords don't match
				$scope.user.password = null;
				$scope.user.password2 = null;
				alert('Passwords must match.  Try again.');
			} else {
				// passwords are good
				userService.register($scope.user)
				.then(res => {
					$state.go('login');
				})
				.catch(err => {
					console.log('err:', err);
					alert('Register failed. Error in console.');
				});
			}
		}
	};




  //
	// $scope.thingArray =[];
  //
	// thingService.getAll()
	// .then( function(things){
	// 	if(things) $scope.thingArray.push(...things);
	// })
	// .catch( err => {
	// 	console.log(err);
	// });
  //
  //
  //
	// $scope.addOneThing = function(thing){
	// 	thingService.addOne(thing)
	// 	.then( function(newThing){
	// 		if(newThing) $scope.thingArray.push(newThing);
	// 	})
	// 	.catch( err => {
	// 		console.log(err);
	// 	});
	// }
  //
	// $scope.removeOneThing = function(thing){
	// 	let index = $scope.thingArray.indexOf(thing);
	// 	thingService.removeOne(thing)
	// 	.then( function(){
	// 		$scope.thingArray.splice(index,1);
	// 	})
	// 	.catch( err => {
	// 		console.log(err);
	// 	});
	// }
  //
	// //  assumes uuid that doesn't change on edit
	// $scope.editOneThing = function(editedThing){
	// 	console.log(editedThing);
	// 	thingService.editOne(editedThing)
	// 	.then( function(updatedThing){
	// 		console.log('edited');
	// 	})
	// 	.catch( err => {
	// 		console.log(err);
	// 	});
	// }
  //
  //
});



