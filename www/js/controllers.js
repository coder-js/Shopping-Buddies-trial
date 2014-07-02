angular.module('starter.controllers', ['ionic'])


.controller('AppCtrl', function($scope, sharedProperties) {
  
  
  $scope.loginName = sharedProperties.getUserName();
  $scope.loginDP = sharedProperties.getUserDP();

})

//----------------------------------------------------------------------------------------------------------------------------------------

.controller('defaultCtrl', function($scope, sharedProperties){
  
})

//-----------------------------------------------------------------------------------------------------------------------------------------

.controller('newTripCtrl', function($scope, $http, sharedProperties){

  var Trips = $scope.Trips=JSON.parse(localStorage.getItem('Trips') || '[]');

  console.log('creating new trip');
  $scope.createTrip = function(trip){
    
    console.log(trip);

    /*
    $http({method: 'POST', url:sharedProperties.getBaseUrl()+'/createTrip', data:{"userId":2,"tripName":trip.name,"occasion":trip.occasion,"duration":trip.duration,"meetup":trip.meetup,"friends":"","venues":trip.venue,"date":trip.date}}).
    success(function(data,status,headers,config){
      console.log("SUCCESS : "+angular.toJson(data));
      window.location.href="#/app/defaultPage";
    }).
    error(function(data,status,headers,config){
      console.log("ERROR : "+angular.toJson(data));
    });  */

   /* $scope.Trips.push({
      id:sharedProperties.getTripId(),
      trip_name:trip.name,
      trip_occasion:trip.occasion,
      trip_venue:trip.venue,
      trip_date:trip.date,
      trip_time:trip.timing,
      trip_meetup:trip.meetup,
      trip_duration:trip.duration
    });
    sharedProperties.setTripId();
    window.localStorage.setItem('Trips', angular.toJson(Trips)); */


    window.location.href="#/app/defaultPage";


  };
})

//--------------------------------------------------------------------------------------------------------------------------------------------------

.controller('myTripsCtrl', function($scope, sharedProperties) {
      console.log("all trips:");
      var getMyTrips = localStorage.getItem('Trips');
      console.log(JSON.parse(getMyTrips)); 

      $scope.myTrips = [
        {
          id:sharedProperties.getTripId(),
          trip_name:"Fun Day",
          trip_occasion:"picnic",
          trip_venue:"park",
          trip_date:"2014-07-03",
          trip_time:"03:30 pm",
          trip_meetup:"hostel",
          trip_duration:"a few hours"},

        {
          id:sharedProperties.getTripId(),
          trip_name:"girls night out",
          trip_occasion:"bday",
          trip_venue:"club",
          trip_date:"2014-06-18",
          trip_time:"05:45",
          trip_meetup:"jdfkn",
          trip_duration:"one hour"},

        {
          id:sharedProperties.getTripId(),
          trip_name:"Party Day",
          trip_occasion:"holiday",
          trip_venue:"house",
          trip_date:"2014-07-03",
          trip_time:"03:30",
          trip_meetup:"hostel",
          trip_duration:"a few hours"},

        {
          id:sharedProperties.getTripId(),
          trip_name:"Enjoy shopping",
          trip_occasion:"feeling vetti",
          trip_venue:"club",
          trip_date:"2014-06-18",
          trip_time:"05:45",
          trip_meetup:"jdfkn",
          trip_duration:"one hour"},

      ];
    
})

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

.controller('myTripCtrl', function($scope, $stateParams, sharedProperties) {
  $scope.name=$stateParams.myTripId;
})

.service('sharedProperties', function(){

  var baseUrl = "https://nodejs-shoppingbuddies.rhcloud.com";
  var userId, userName, userDP; 
  var tripId = 1;

  return {
        getUserId: function() {
            return userId;
        },
        setUserId: function(value) {
            userId = value;
        },
        getUserName: function() {
            return window.localStorage.getItem("userName");
        },
        setUserName: function(value) {
            window.localStorage.setItem("userName", value);
        },
        getUserDP: function() {
            return window.localStorage.getItem("userDP");
        },
        setUserDP: function(value) {
            window.localStorage.setItem("userDP", value);
        },
        getBaseUrl: function() {
            return baseUrl;
        },
        getTripId: function() {
            return tripId;
        },
        setTripId: function() {
            tripId = tripId+1;
        }
    }

})

//-----------------------------------------------------------------------------------------------------------------------------------------------------

var isLoggedIn;

//controller for login!
var LoginCtrl = function ($scope, $facebook, $http, sharedProperties) {

  var accessToken;
  isLoggedIn = false;
  
  window.localStorage.clear();
  
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
        sharedProperties.setUserName(response.name);
        console.log(sharedProperties.getUserName());
        isLoggedIn = true;
        
        console.log("creating a new user account in shopping buddies DB");

        /*$http({method: 'POST', url:sharedProperties.getBaseUrl()+"/createTrip", params:{"userId":sharedProperties.getUserId()},data:{"tripName":trip.name,"occasion":trip.occasion,"duration":trip.duration,"meetup":trip.meetup,"friends":"","venues":"","date":trip.date}}).
        success(function(data,status,headers,config){
          console.log("SUCCESS : "+JSON.stringify(data));
          window.location.href="#/app/defaultPage";
        }).
        error(function(data,status,headers,config){
          console.log("ERROR : "+JSON.stringify(data));
        });*/

        window.location.href = "#/app/defaultPage";
        
      },
      function(err) {
        //if not logged in - displaying no text
      });

    $facebook.api("/me/?fields=picture").then(
      function(response){
        sharedProperties.setUserDP(response.picture.data.url);
        console.log("profile picture: ");
        console.log(response.picture.data.url);
      }); 
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

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
