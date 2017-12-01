//Angular module angularNjsBlog
var app = angular.module('angularNjsBlog', []);

//Just one controller for the whole app
app.controller('mainController',function($scope, $http) {
	//$scope.formData = {};

	
	//Sends new entry to the API and loads the rest
	$scope.createEntry = function() {
		var param = JSON.stringify($scope.formData);
		$http.post('/api/add', param).then(
			function(response){ //success
				$scope.formData = {};//clear the form
				$scope.entries = response.data;//renew the list front-side with the data from the server
				console.log(response);
			},function(error){ //error
				console.log('Error: ' + error);
			});
	}
	
	//Sends new entry to the API and loads the rest
	/*
	$scope.createEntry = function() {
		
		$http({ //POST that saves the entry to the db, controller handles it on server
				method: 'POST',
				url: '/api/add',
			}).then(function(response){ //success
				$scope.formData = {};//clear the form
				$scope.entries = response.data;//renew the list front-side with the data from the server
				console.log(response);
			},function(error){ //error
				console.log('Error: ' + error);
			});
	}
	*/
	
	//Loads all blog entries on page load
	$http({ //GET that recieves a list of all entries from the server
		method: 'GET',
		url: '/api/list'
	}).then(function(response){ //success
		$scope.entries = response.data;//renew the list front-side with the data from the server
		console.log(response)
	},function(error){ //error
		console.log('Error: ' + error);
	});

	//Deletes an entry and loads the rest
	$scope.deleteEntry = function(_id) {
		$http({  //Recieves the id of the entry to delete, controller handles it on server
				method: 'DELETE',
				url: '/api/delete/' + _id
			}).then(function(response){ //success
				$scope.entries = response.data;//renew the list front-side with the data from server
				console.log(response);
			},function(error){ //error
				console.log('Error: ' + error);
			});
	}
	
});