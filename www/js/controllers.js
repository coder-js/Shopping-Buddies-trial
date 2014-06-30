angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  },

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})




.controller('myTripsCtrl', function($scope) {
  $scope.myTrips = [
    { title: 'A', id: 1 },
    { title: 'C', id: 2 },
    { title: 'D', id: 3 },
    { title: 'I', id: 4 },
    { title: 'R', id: 5 },
    { title: 'W', id: 6 }
  ];
})

.controller('myTripCtrl', function($scope, $stateParams) {
  $scope.name=$stateParams.myTripId;
})


//controller for login!
var LoginCtrl = function ($scope, $facebook) {

  $scope.isLoggedIn = false;
  $scope.login = function() {
    $facebook.login().then(function() {
      refresh();
    });
  }
  function refresh() {
    $facebook.api("/me").then( 
      function(response) {
        //$scope.welcomeMsg = response;
        console.log(response);
        $scope.isLoggedIn = true;
        console.log("redirecting...");
        window.location.href = "#/app/defaultPage";
      },
      function(err) {
        //if not logged in - displaying no text
      });
  }
  
  refresh();
};


var LogoutCtrl = function($scope, $facebook){
  console.log("trying to log out");
  $scope.logout = function(){
    $facebook.logout(function(){
        $scope.isLoggedIn = false;
    });
  }
  console.log($scope.isLoggedIn);
};