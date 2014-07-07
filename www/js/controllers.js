angular.module('starter.controllers', ['ionic'])


.controller('AppCtrl', function($scope, sharedProperties,OpenFB) {
  
  $scope.$on("loginsuccess", function(){
      $scope.loginName = sharedProperties.getUserName();
      $scope.loginDP = sharedProperties.getUserDP();
      if(!$scope.$$phase){
        $scope.$apply();
      }
  });

  $scope.loginName = sharedProperties.getUserName();
  
  $scope.loginDP = sharedProperties.getUserDP();
  
})


//-----------------------------------------------------------------------------------------------------------------------------------------

.controller('newTripCtrl', function($scope, $http, sharedProperties, $ionicModal){

  console.log('creating new trip');

  $scope.sendTrip = function(trip){
    ActivityIndicator.show("Creating new trip...");
    console.log("sending trip");
    
    var friendList = [];

    for(var i=0; i< $scope.findFriends.length; i++)
      if($scope.findFriends[i].selected)
        friendList.push($scope.findFriends[i].id);

      console.log(trip.trip_date);
      console.log("date :"+trip.trip_date+" "+trip.trip_timing+":00");

    $http({method: 'POST', url:sharedProperties.getBaseUrl()+'/createTrip', data:{"userId":sharedProperties.getUserId(),"tripName":trip.trip_name,"occasion":trip.trip_occasion,"duration":trip.trip_duration,"meetup":trip.trip_meetup,"invitedfriends":friendList,"venues":trip.trip_venue,"date":trip.trip_date+" "+trip.trip_timing+":00"}}).
    success(function(data,status,headers,config){
      console.log("SUCCESS : "+angular.toJson(data));
      ActivityIndicator.hide();
      alert("\""+trip.trip_name+"\" trip created!");
      window.location.href="#/app/defaultPage";
    }).
    error(function(data,status,headers,config){
      console.log("ERROR : "+angular.toJson(data));
    });  
  };
   
  $scope.createTrip = function(trip){

    console.log(trip);
   
    if(!trip)
    {
      alert("Can't submit empty trip");
      return false;
    }
    if(!trip.trip_name)
    {
      alert("Enter Trip Name");
      return false;
    }  
    if(!trip.trip_venue)
    {
      alert("Enter Trip Venue");
      return false;
    }
    if(!trip.trip_date)
    {
      alert("Enter Trip Date");
      return false;
    }
    else if(trip.trip_date < new Date().toJSON().slice(0,10))
    {
      alert("Enter a future date. This date has already passed");
      return false;
    }

    if(!trip.trip_timing)
    {
      console.log(trip.trip_time);
      alert("Enter Trip Time");
      return false;
    }
    if(!trip.trip_occasion)
    {
      trip.trip_occasion=" ";
    }
    if(!trip.trip_meetup)
    {
      trip.trip_meetup=" ";
    }
    if(!trip.trip_duration)
    {
      trip.trip_duration="Not sure";
    }
    $scope.sendTrip(trip);
  };
  
    $scope.findFriends = JSON.parse(sharedProperties.getFriends());
    

    $scope.selected = function(item){
        if(item.selected)
          return true;
        else
          return false;
    };


  $ionicModal.fromTemplateUrl('templates/addFriends.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

})



//--------------------------------------------------------------------------------------------------------------------------------------------------


.controller('myTripsCtrl', function($scope, $http, sharedProperties) {
  

    var init = function(){

        $scope.myTrips = JSON.parse(sharedProperties.getMyTrips());
        
        $http({method: 'GET', url:sharedProperties.getBaseUrl()+'/trips?userId='+sharedProperties.getUserId()+'&past=0'}).
          success(function(data,status,headers,config){
          console.log("SUCCESS: "+angular.toJson(data));
          sharedProperties.setMyTrips(data);
          $scope.myTrips = JSON.parse(sharedProperties.getMyTrips());
          console.log("refreshed: "+$scope.myTrips);
        }).
        error(function(data,status,headers,config){
          console.log("ERROR: " + angular.toJson(data));
        });
    };


      $scope.updateStatus = function(item, status){
        ActivityIndicator.show("Updating status...");
        console.log(item);
        $http({method: 'POST', url:sharedProperties.getBaseUrl()+'/updateTripStatus', data:{"userId":sharedProperties.getUserId(), "tripId":item.tripId, "status":status}}).
          success(function(data,status,headers,config){
            console.log("SUCCESS: ");
            ActivityIndicator.hide();
            alert("Status updated");  
            init();
          }).
          error(function(data,status,headers,config){
            console.log("ERROR: ");
            console.log(data);
            alert("Couldn't update status. Try again later");
          });


      };


      $scope.data = {
        showDelete: false
      };
  
      $scope.onItemDelete = function(item) {
        console.log(item);
        console.log(sharedProperties.getUserId());
        if(confirm("Are you sure you want to leave \""+item.tripName+"\" trip?")){ 
            $http({method: 'POST', url:sharedProperties.getBaseUrl()+'/leaveTrip', data:{"userId":sharedProperties.getUserId(),"tripId":item.tripId}}).
              success(function(data,status,headers,config){
                console.log("SUCCESS: ");
                alert("Trip deleted");
                $scope.data.showDelete = !$scope.data.showDelete;  
                init();
              }).
              error(function(data,status,headers,config){
                console.log("ERROR: ");
                console.log(data);
                alert("Couldn't delete trip. Try again later");
                $scope.data.showDelete = !$scope.data.showDelete; 
              });

        }
        else{
          $scope.data.showDelete = !$scope.data.showDelete;
          return false;
        }
      };



      init();
      
  
    
})

//--------------------------------------------------------------------------------------------------------------------------------------------------------

.controller('pastTripsCtrl', function($http, $scope, $stateParams, sharedProperties) {
    
    
    var init = function(){
        $scope.pastTrips = JSON.parse(sharedProperties.getPastTrips());
        $http({method: 'GET', url:sharedProperties.getBaseUrl()+'/trips?userId='+sharedProperties.getUserId()+'&past=1'}).
        success(function(data,status,headers,config){
          console.log("SUCCESS: "+angular.toJson(data));
          sharedProperties.setPastTrips(data);
          $scope.pastTrips = JSON.parse(sharedProperties.getPastTrips());
          
        }).
        error(function(data,status,headers,config){
          console.log("ERROR: "+angular.toJson(data));
        });
    };


    $scope.data = {
        showDelete: false
      };
  
      $scope.onItemDelete = function(item) {
        console.log(item);
        if(confirm("Are you sure you want to delete \""+item.tripName+"\" trip?")){ 
            $http({method: 'POST', url:sharedProperties.getBaseUrl()+'/leaveTrip', data:{"userId":sharedProperties.getUserId(),"tripId":item.tripId}}).
            success(function(data,status,headers,config){
              console.log("SUCCESS: ");
              alert("Trip deleted");
              $scope.data.showDelete = !$scope.data.showDelete;  
            }).
            error(function(data,status,headers,config){
              console.log("ERROR: ");
              alert("Couldn't delete trip. Try again later");
              $scope.data.showDelete = !$scope.data.showDelete; 
            });

        }
        else{
          $scope.data.showDelete = !$scope.data.showDelete;
          return false;
        }
      };

      init();

})


//-----------------------------------------------------------------------------------------------------------------------------------------------------

.controller('myTripCtrl', function($scope, $stateParams, sharedProperties, $ionicModal) {
  
  $scope.myTrips = JSON.parse(sharedProperties.getMyTrips());
  
  var init = function(){
    for(var i=0; i<Object.keys($scope.myTrips).length ; i+=1){
      if($scope.myTrips[i].tripId == $stateParams.myTripId){
        $scope.trip=$scope.myTrips[i];
        break;
      }
    }
  };

  init();

  $ionicModal.fromTemplateUrl('templates/viewFriends.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
    
})

//-----------------------------------------------------------------------------------------------------------------------------------------------------------


.controller('pastTripCtrl', function($scope, $stateParams, sharedProperties) {
  
  $scope.pastTrips = JSON.parse(sharedProperties.getPastTrips());
  
  var init = function(){
    for(var i=0; i<Object.keys($scope.pastTrips).length ; i+=1){
      if($scope.pastTrips[i].tripId == $stateParams.pastTripId){
        $scope.trip=$scope.pastTrips[i];
        break;
      }
    }
  };

  init();
})

//-----------------------------------------------------------------------------------------------------------------------------------------------------------

.controller('friendsCtrl', function($http, $scope, sharedProperties) {
    
    var init = function(){
      $scope.findFriends = JSON.parse(sharedProperties.getFriends());
    };

    init();

})

//-----------------------------------------------------------------------------------------------------------------------------------------------------------

.controller('socialShareCtrl', function($scope,$window, OpenFB, sharedProperties) {
     $scope.shareFacebook = function(){
        window.open(sharedProperties.getFBShareUrl(),"_blank", "location=no");
     }

     $scope.shareTwitter = function(){
        window.open(sharedProperties.getTweetUrl(),"_blank", "location=no");
     }
})

//------------------------------------------------------------------------------------------------------------------------------------------------------------

.service('sharedProperties', function(){

  var app_id = '249034425292668';
  var redirect_uri = 'http://localhost:8100/oauthcallback.html';
  if(window.cordova) {
    app_id = "467674736710937";
    redirect_uri = "https://www.facebook.com/connect/login_success.html";
  }

  var baseUrl = "https://nodejs-shoppingbuddies.rhcloud.com";
  var fbShareURL = "https://www.facebook.com/dialog/feed?app_id=" + app_id +
                   "&link=http%3A%2F%2Fwww.facebook.com%2Fshoppingbuddiesapp" +
                   "&name=Shopping+Buddies&description=Its+really+cool+app.+Check+out+buddies.+Lets+shop%21%21%21%21&" +
                   "redirect_uri=http://www.facebook.com";

  var tweetURL = "https://twitter.com/intent/tweet?text=Hi+shopping+buddies%2C+check+this+out.+%23shoppingbuddies";
  //var tripId = 1;

  return {
        getFBShareUrl: function(){
           return fbShareURL;
        },
        getTweetUrl: function(){
           return tweetURL;
        },
        getTitle: function(){

        },
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
        getFriends: function(){
            return localStorage.getItem('friends');
        },
        setFriends: function(data){
            localStorage.setItem('friends', angular.toJson(data));
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


var LoginCtrl = function ($scope,$rootScope,OpenFB, $http, sharedProperties, $ionicModal) {

  var accessToken;
  sharedProperties.setLoginStatus(false);
  
  window.localStorage.clear();

  $scope.login = function() {
 
    OpenFB.login('email,publish_stream,user_friends').then(function(response) {

      refresh();
    },function(){
    });
  }

  function refresh() {
    OpenFB.get("/me?fields=id,name,picture").success( 
      function(response) {
        ActivityIndicator.show("Logging in...");

        var id = response.id;
        sharedProperties.setLoginStatus(true);
        sharedProperties.setUserName(response.name);
        sharedProperties.setUserDP(response.picture.data.url); 

        $http({method: 'POST', url:sharedProperties.getBaseUrl()+"/login", data:{"name":sharedProperties.getUserName(),"app_unique_id":id}}).
        success(function(data,status,headers,config){
          sharedProperties.setUserId(data.userId);
          $rootScope.$broadcast("loginsuccess");
          ActivityIndicator.hide();
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

    OpenFB.get("/me/friends/").success(
      function(response){
        console.log("friends resp:");
        console.log(response);
        sharedProperties.setFriends(response.data);
      }).
    error(function(response){
      console.log(response);
    });

  } 

   $scope.source;
   $scope.num;

  
  $scope.openModal = function() {
    $scope.source="img/tour/1.png";
    $scope.num=1;
    console.log("opening.."+$scope.source);
    
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
 
 
  
  /*//img1 = new Image ();
  var img1 = "img/tour/1.png";
  //img2 = new Image ();
  var img2 = "img/tour/2.png";
  //img3 = new Image ();
  var img3 = "img/tour/3.png";
  //img4 = new Image ();
  var img4 = "img/tour/4.png";
  //img5 = new Image ();
  var img5 = "img/tour/5.png";
  //img6 = new Image ();
  var img6 = "img/tour/6.png";
  //img7 = new Image ();
  var img7 = "img/tour/7.png";
  //img8 = new Image ();
  var img8 = "img/tour/8.png";
  //img9 = new Image ();
  var img9 = "img/tour/9.png";
  //img10 = new Image ();
  var img10 = "img/tour/10.png";
  //img11 = new Image ();
  var img11 = "img/tour/11.png";
  //img12 = new Image ();
  var img12 = "img/tour/12.png"; 
  //img13 = new Image ();
  var img13 = "img/tour/13.png";*/

  $scope.slideshowUp =function(){
    $scope.num=$scope.num+1;
    if ($scope.num==14)
      $scope.num=1;
    $scope.source="img/tour/"+$scope.num+".png";
    console.log("opening.."+$scope.source);
    
  };

  $scope.slideshowBack =function(){
    $scope.num=$scope.num-1;
    if ($scope.num==0)
      $scope.num=13;
    $scope.source="img/tour/"+$scope.num+".png";
    console.log("opening.."+$scope.source);  
  };

   $ionicModal.fromTemplateUrl('templates/tour.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

};


var LogoutCtrl = function($scope, OpenFB, sharedProperties,$ionicViewService){
  
  $scope.logout = function(){
    ActivityIndicator.show("Logging out...");
    $ionicViewService.clearHistory();
    OpenFB.logout()
    sharedProperties.setLoginStatus(false);
    window.localStorage.clear();
    window.location.href = "#/app/login";
    ActivityIndicator.hide();
  }

  $scope.back = function(){
    window.location.href= "#/app/defaultPage";
  }
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
