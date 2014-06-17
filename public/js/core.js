// create module
var users = angular.module('users', [ ]);

// Controller: User
function userController($scope, $http) {
	$scope.formData = {};
	
	// show all users when landing on the page
	$http.get('/api/users').success(function(data){
		$scope.users = data;
		console.log(data);
	}).error(function(data){
		console.log('Error: '+data);
	});
}