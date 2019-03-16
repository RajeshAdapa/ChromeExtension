var app = angular.module("todo",['ngAnimate']);

app.controller("todoCtrl",function($scope,$timeout,$sce){
		
	$scope.tabs = [
		{
			title:'All',
			url:'all'
		},

		{
			title:'Completed',
			url:'comp'
		}
	];

	$scope.currentTab = 'all';

	$scope.onClickTab = function (tab) {
		$scope.currentTab = tab.url;
	};
	
	$scope.isActiveTab = function(tabUrl) {
		return tabUrl == $scope.currentTab;
	};

	if( localStorage.getItem('all') != null) 
		$scope.all = JSON.parse(localStorage.getItem('all'));	
	else 
		$scope.all = [];

	if( localStorage.getItem('completed') != null) 
		$scope.completed = JSON.parse(localStorage.getItem('completed'));	
	else 
		$scope.completed = [];


	$scope.edit_button =$sce.trustAsHtml("&#9998;"); 
	$scope.close_button = $sce.trustAsHtml("&#10006;");
	$scope.save_button=$sce.trustAsHtml("&#128190;");

	$scope.isEditEnabled = false;

	$scope.addTask = function(event) {
		var task = $scope.task;
		if(!task)
			return;
		if((event =='add' || event.keyCode == 13) && $scope.isEditEnabled == false) {

			if($scope.all.indexOf(task) == -1) {
				$scope.all.push(task);
				$scope.task="";
				localStorage.setItem('all',JSON.stringify($scope.all));
			}
			else {
				$scope.errorMsg = "Task already exists in the list";
				 $timeout(function () {
				      $scope.errorMsg = "";
				  }, 2000);
			}
		}

	};

	$scope.completeTask = function(index) {
		$scope.index = $scope.completed.indexOf($scope.all[index]) ;
		if($scope.index == -1)
			$scope.completed.push($scope.all[index]);
		else
			$scope.completed.splice($scope.index,1);

		localStorage.setItem('completed',JSON.stringify($scope.completed));
	};

	$scope.isCompleted = function(index) {
		if($scope.completed.indexOf($scope.all[index]) != -1)
			return true;

		return false;
	};

	$scope.editTask = function(index) {
		if($scope.flag != true) {
			$scope.task= $scope.all[index];
			$scope.flag=true;
			$scope.element = document.getElementById('task');
			$scope.element.focus();

			$scope.isEditEnabled = true;
			return false;
		}
		else
			return true;
	};

	$scope.saveTask = function(index) {
		if($scope.task.trim() != "") {
			$scope.all[index] = $scope.task;
			localStorage.setItem('all',JSON.stringify($scope.all));
			$scope.task = "";
			$scope.flag = false;
			$scope.isEditEnabled = false;
		}
	};
	$scope.removeTask = function(index) {
		if($scope.isEditEnabled == false) {
			$scope.all.splice(index,1);
			localStorage.setItem('all',JSON.stringify($scope.all));

			$scope.completed.splice(index,1);
			localStorage.setItem('completed',JSON.stringify($scope.completed));
		}
	};

	$scope.isURL = function(value) {
		 var URL_REGEXP = /^((?:http|ftp)s?:\/\/)(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::\d+)?(?:\/?|[\/?]\S+)$/i;

		 if(URL_REGEXP.test(value))
		 	return true;
		 return false;
	};
});