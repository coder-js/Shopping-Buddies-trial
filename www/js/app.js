// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

//var baseUrl = nodejs-shoppingbuddies.rhcloud.com;


angular.module('starter', ['ionic', 'starter.controllers','openfb'])

.run(function($ionicPlatform,OpenFB) {

  //    
  $ionicPlatform.ready(function() {
    if(window.cordova) {
      OpenFB.init('467674736710937', 'https://www.facebook.com/connect/login_success.html');  
    }else {
      OpenFB.init('249034425292668', 'http://localhost:8100/oauthcallback.html');
    }

    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    //LHS navigation bar
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.login', {   //to be made
      url: "/login",
      views: {
        'menuContent' :{
          templateUrl: "templates/login.html",
          controller: 'LoginCtrl'
        }
      }
    })

    .state('app.logout', {  //to be made
      url: "/logout",
      views: {
        'menuContent' :{
          templateUrl: "templates/logout.html",
          controller: 'LogoutCtrl'
        }
      }
    })

    .state('app.defaultPage', {
      url: "/defaultPage",
      views: {
        'menuContent' :{
          templateUrl: "templates/defaultPage.html",
          controller: "defaultCtrl"
        }
      }
    })

    .state('app.findFriends', {
      url: "/findFriends",
      views: {
        'menuContent' :{
          templateUrl: "templates/findFriends.html", 
          //controller: "findFriendsCtrl"
        }
      }
    })

    
    .state('app.myFriends', {
      url: "/myFriends",
      views: {
        'menuContent' :{
          templateUrl: "templates/myFriends.html", 
          controller: "friendsCtrl"
        }
      }
    })

    
    .state('app.newTrip', {
      url: "/newTrip",
      views: {
        'menuContent' :{
          templateUrl: "templates/newTrip.html",
          controller: 'newTripCtrl'
        }
      }
    })  
    
    .state('app.myTrips', {
      url: "/myTrips",
      views: {
        'menuContent' :{
          templateUrl: "templates/myTrips.html",
          controller: 'myTripsCtrl'
        }
      }
    })

    .state('app.pastTrips', {
      url: "/pastTrips",
      views: {
        'menuContent' :{
          templateUrl: "templates/pastTrips.html",
          controller: 'pastTripsCtrl'
        }
      }
    })

    
    .state('app.single1', {
      url: "/myTrips/:myTripId",
      views: {
        'menuContent' :{
          templateUrl: "templates/myTrip.html",
          controller: 'myTripCtrl'
        }
      }
    })


    .state('app.single2', {
      url: "/pastTrips/:pastTripId",
      views: {
        'menuContent' :{
          templateUrl: "templates/pastTrip.html",
          controller: 'pastTripCtrl'
        }
      }
    })
    /*
    .state('app.myFav', {
      url: "/myFav",
      views: {
        'menuContent' :{
          templateUrl: "templates/myFav.html",

        }
      }
    })

    .state('app.addFav', {
      url: "/addFav",
      views: {
        'menuContent' :{
          templateUrl: "templates/addFav.html"
          //controller: 'AddFavCtrl'
        }
      }
    })*/
    ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});

