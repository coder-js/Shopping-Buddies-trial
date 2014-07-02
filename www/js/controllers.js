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

  console.log('creating new trip');

  $scope.createTrip = function(trip){
    
    console.log(trip);

    $http({method: 'POST', url:sharedProperties.getBaseUrl()+'/createTrip', data:{"userId":sharedProperties.getUserId(),"tripName":trip.trip_name,"occasion":trip.trip_occasion,"duration":trip.trip_duration,"meetup":trip.trip_meetup,"friends":"","venues":trip.trip_venue,"date":trip.trip_date+" "+trip.trip_timing}}).
    success(function(data,status,headers,config){
      console.log("SUCCESS : "+angular.toJson(data));
      alert(trip.name+" trip created!");
      window.location.href="#/app/defaultPage";
    }).
    error(function(data,status,headers,config){
      console.log("ERROR : "+angular.toJson(data));
    });  

   /* LOCAL STORAGE
      var Trips = $scope.Trips=JSON.parse(localStorage.getItem('Trips') || '[]');
      $scope.Trips.push({
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

.controller('myTripsCtrl', function($scope, $http, sharedProperties) {

    $scope.myTrips = sharedProperties.getMyTrips();
    $http({method: 'GET', url:sharedProperties.getBaseUrl()+'/trips?userId='+sharedProperties.getUserId()+'&past=0'}).
    success(function(data,status,headers,config){
      console.log("SUCCESS: "+angular.toJson(data));
      sharedProperties.setMyTrips(data);
      $scope.myTrips = sharedProperties.getMyTrips();
      
    }).
    error(function(data,status,headers,config){
      console.log("ERROR: "+angular.toJson(data));
    });
    

    /*HARD CODED
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

      ]; */
    
})

//--------------------------------------------------------------------------------------------------------------------------------------------------------

.controller('pastTripsCtrl', function($http, $scope, $stateParams, sharedProperties) {
    
    $scope.pastTrips = sharedProperties.getPastTrips();
    $http({method: 'GET', url:sharedProperties.getBaseUrl()+'/trips?userId='+sharedProperties.getUserId()+'&past=1'}).
    success(function(data,status,headers,config){
      console.log("SUCCESS: "+angular.toJson(data));
      sharedProperties.setPastTrips(data);
      $scope.pastTrips = sharedProperties.getPastTrips();
      
    }).
    error(function(data,status,headers,config){
      console.log("ERROR: "+angular.toJson(data));
    });

})


//-----------------------------------------------------------------------------------------------------------------------------------------------------

.controller('myTripCtrl', function($scope, $stateParams, sharedProperties) {
  $scope.name=$stateParams.myTripId;
})

//-----------------------------------------------------------------------------------------------------------------------------------------------------------


.service('sharedProperties', function(){

  var baseUrl = "https://nodejs-shoppingbuddies.rhcloud.com";
  //var tripId = 1;

  return {
        getLoginStatus: function() {
            return window.localStorage.getItem("isLoggedIn");
        },
        setLoginStatus: function(value) {
            window.localStorage.setItem("isLoggedIn",value);
        },
        getUserId: function() {
            return window.localStorage.getItem("userId");
        },
        setUserId: function(value) {
            window.localStorage.setItem("userId",value);
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
        getAccessToken: function() {
            return window.localStorage.getItem("accessToken");
        },
        setAccessToken: function(value) {
            window.localStorage.setItem("accessToken", value);
        },
        getMyTrips: function(){
            return localStorage.getItem('myTrips');
        },
        setMyTrips: function(data){
            localStorage.setItem('myTrips', angular.toJson(data));
        },
        getPastTrips: function(){
            return localStorage.getItem('pastTrips');
        },
        setPastTrips: function(data){
            localStorage.setItem('pastTrips', angular.toJson(data));
        },
        getBaseUrl: function() {
            return baseUrl;
        }
        /*
        getTripId: function() {
            return tripId;
        },
        setTripId: function() {
            tripId = tripId+1;
        }*/
    }

})

//-----------------------------------------------------------------------------------------------------------------------------------------------------


var LoginCtrl = function ($scope, $facebook, $http, sharedProperties) {

  var accessToken;
  sharedProperties.setLoginStatus(false);
  
  window.localStorage.clear();
  
  $scope.login = function() {
 
    $facebook.login().then(function(response) {
      console.log("logging in response:");
      console.log(response);
      console.log("access token set ");
      sharedProperties.setAccessToken(response.authResponse.accessToken);
      refresh();
    },
    {scope: 'read_friendlists'});
    
  }
  function refresh() {
    $facebook.api("/me").then( 
      function(response) {
        
        sharedProperties.setLoginStatus(true);

        console.log(response.id);
        var id = response.id;
        console.log(id);
        sharedProperties.setUserName(response.name);
        console.log(sharedProperties.getUserName());
        
        $http({method: 'POST', url:sharedProperties.getBaseUrl()+"/login", data:{"name":sharedProperties.getUserName(),"app_unique_id":id}}).
        success(function(data,status,headers,config){
          console.log("LOGIN SUCCESS : "+JSON.stringify(data));
          sharedProperties.setUserId(data.userId);
          window.location.href="#/app/defaultPage";
        }).
        error(function(data,status,headers,config){
          console.log("LOGIN ERROR : "+JSON.stringify(data));
        });

        window.location.href = "#/app/defaultPage";
        
      },
      function(err) {
        //if not logged in - displaying no text
      });

    $facebook.api("/me/?fields=picture").then(
      function(response){
        sharedProperties.setUserDP(response.picture.data.url);
      }); 
  }  

};


var LogoutCtrl = function($scope, $facebook, sharedProperties){
  
  $scope.logout = function(){
    console.log("trying to log out");
    sharedProperties.setLoginStatus(false);
    window.localStorage.clear();
  }

  $scope.back = function(){
    window.location.href= "#/app/defaultPage";
  }
  
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
