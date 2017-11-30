//Angular module angularNjsBlog
angular.module('angularNjsBlog', []);

//Just one controller for the whole app
function mainController($scope, $http) {
	$scope.formData = {};

	//Loads all blog entries on page load
	$http.get('/api/list') //GET that recieves a list of all entries from the server
		.success(function(data) {
			$scope.entries = data;//renew the list front-side with the data from the server
			console.log(data)
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	//Sends new entry to the API and loads the rest
	$scope.createEntry = function(){
		$http.post('/api/add', $scope.formData) //POST that saves the entry to the db, controller handles it on server
			.success(function(data) {
				$scope.formData = {};//clear the form
				$scope.entries = data;//renew the list front-side with the data from the server
				console.log(data);
			})
			.error(function(data) {
				console.log('Error:' + data);
			});
	};

	//Deletes an entry and loads the rest
	$scope.deleteEntry = function(id) {
		$http.delete('/api/delete/' + id) //Recieves the id of the entry to delete, controller handles it on server
			.success(function(data) {
				$scope.entries = data;//renew the list front-side with the data from back-side
				console.log(data);
			})
			.error(function(data) {
				console.log('Error:' + data);
			});
	};
}