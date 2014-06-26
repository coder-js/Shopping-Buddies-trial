// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
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

    //renamed search
    .state('app.findFriends', {
      url: "/findFriends",
      views: {
        'menuContent' :{
          templateUrl: "templates/findFriends.html"
        }
      }
    })

    //renamed browse    
    .state('app.myFriends', {
      url: "/myFriends",
      views: {
        'menuContent' :{
          templateUrl: "templates/myFriends.html"
        }
      }
    })

    //renamed playlists.html
    .state('app.newTrip', {
      url: "/newTrip",
      views: {
        'menuContent' :{
          templateUrl: "templates/newTrip.html",
          //controller: 'PlaylistsCtrl'
        }
      }
    })
  
    //renamed playlists.html
    .state('app.myTrips', {
      url: "/myTrips",
      views: {
        'menuContent' :{
          templateUrl: "templates/myTrips.html",
          controller: 'myTripsCtrl'
        }
      }
    })

    //for each trip -> renaming playlist
    .state('app.single', {
      url: "/myTrips/:myTripId",
      views: {
        'menuContent' :{
          templateUrl: "templates/myTrip.html",
          controller: 'myTripCtrl'
        }
      }
    })

    //renamed login.html
    .state('app.myFav', {
      url: "/myFav",
      views: {
        'menuContent' :{
          templateUrl: "templates/myFav.html"
        }
      }
    })

    .state('app.addFav', {
      url: "/addFav",
      views: {
        'menuContent' :{
          templateUrl: "templates/addFav.html"
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/myTrips');
});

