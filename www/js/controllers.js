angular.module('starter.controllers', ['ionic'])


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
  };

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

.controller('newTripCtrl', function($scope, $http, sharedProperties){

  console.log('in newTripCtrl');
  $scope.createTrip = function(trip){
    
    //createTrip.tripId = ++createTrip.tripId || 1;

    console.log(trip + createTrip.tripId);

    /*$http({method: 'POST', url:sharedProperties.getBaseUrl()+'/createTrip', params:{"userId":2,"tripName":trip.name,"occasion":trip.occasion,"duration":trip.duration,"meetup":trip.meetup,"friends":"","venues":"","date":trip.date}}).
    success(function(data,status,headers,config){
      console.log("SUCCESS : "+angular.toJson(params));
      window.location.href="#/app/defaultPage";
    }).
    error(function(data,status,headers,config){
      console.log("ERROR : "+angular.toJson(params));
    }); */
    
    localStorage.setItem('trip'+createTrip.tripId, angular.toJson(trip));
    
    window.location.href="#/app/defaultPage";
  };

})


.controller('myTripsCtrl', function($scope, sharedProperties) {
  $scope.myTrips = [
    { name: 'A', id: 1 },
    { name: 'C', id: 2 },
    { name: 'D', id: 3 },
    { name: 'I', id: 4 },
    { name: 'R', id: 5 },
    { name: 'W', id: 6 }
  ];
})

.controller('myTripCtrl', function($scope, $stateParams, sharedProperties) {
  $scope.name=$stateParams.myTripId;
})

.service('sharedProperties', function(){

  var baseUrl = "https://nodejs-shoppingbuddies.rhcloud.com";
  var userId; 

  return {
        getUserId: function() {
            return userId;
        },
        getBaseUrl: function() {
            return baseUrl;
        },
        setUserId: function(value) {
            userId = value;
        }
    }

})

var isLoggedIn;

//controller for login!
var LoginCtrl = function ($scope, $facebook, $http, sharedProperties) {

  var accessToken;
  isLoggedIn = false;
  console.log("is logged in: " +isLoggedIn);
  
  $scope.login = function() {
    $facebook.login().then(function(response) {
      console.log("logging in response:");
      console.log(response);
      console.log("access token: ");
      console.log(response.authResponse.accessToken);
      accessToken = response.authResponse.accessToken;
      refresh();
    },
    {scope: 'read_friendlists'});
    
  }
  function refresh() {
    $facebook.api("/me").then( 
      function(response) {
        //$scope.welcomeMsg = response;
        console.log(response);
        isLoggedIn = true;
        console.log("redirecting...setting userId as 573");
        sharedProperties.setUserId(573);
        console.log(sharedProperties.getUserId());
        console.log("creating a new user account in shopping buddies DB");

        $http({method: 'POST', url:sharedProperties.getBaseUrl()+"/createTrip", params:{"userId":sharedProperties.getUserId()},data:{"tripName":trip.name,"occasion":trip.occasion,"duration":trip.duration,"meetup":trip.meetup,"friends":"","venues":"","date":trip.date}}).
        success(function(data,status,headers,config){
          console.log("SUCCESS : "+JSON.stringify(data));
          window.location.href="#/app/defaultPage";
        }).
        error(function(data,status,headers,config){
          console.log("ERROR : "+JSON.stringify(data));
        });

        window.location.href = "#/app/defaultPage";
        
      },
      function(err) {
        //if not logged in - displaying no text
      });

    /*$facebook.api("/me/permissions/public_profile").then(
      function(response){
        console.log("friends");
        console.log(response);
      }); */
  }  

};


var LogoutCtrl = function($scope, $facebook){
  
  $scope.logout = function(){
    console.log("trying to log out");
    isLoggedIn = false;
    $facebook.logout(function(response){
        console.log(response);
        isLoggedIn = false;
        console.log("isLoggedIn: "+isLoggedIn);
    });
  }

  $scope.back = function(){
    window.location.href= "#/app/defaultPage";
  }
  
};


//not working
var AddFavCtrl = function($scope, sharedProperties){
  $scope.addPic = function(){
    console.log('pic');
  }
};


