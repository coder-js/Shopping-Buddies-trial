// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

//var baseUrl = nodejs-shoppingbuddies.rhcloud.com;


angular.module('starter', ['ionic', 'starter.controllers', 'ngFacebook'])

.run(function($ionicPlatform) {

  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

    // Load the facebook SDK asynchronously
    (function(){
     // If we've already installed the SDK, we're done
     if (document.getElementById('facebook-jssdk')) {return;}

     // Get the first script element, which we'll use to find the parent node
     var firstScriptElement = document.getElementsByTagName('script')[0];

     // Create a new script element and set its id
     var facebookJS = document.createElement('script'); 
     facebookJS.id = 'facebook-jssdk';

     // Set the new script's source to the source of the Facebook JS SDK
     facebookJS.src = '//connect.facebook.net/en_US/all.js';

     // Insert the Facebook JS SDK into the DOM
     firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
   }());


 
})

.config(function($stateProvider, $urlRouterProvider, $facebookProvider) {
  $facebookProvider.setAppId('249034425292668'); 
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

    
    .state('app.single', {
      url: "/myTrips/:myTripId",
      views: {
        'menuContent' :{
          templateUrl: "templates/myTrip.html",
          controller: 'myTripCtrl'
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
})

;
