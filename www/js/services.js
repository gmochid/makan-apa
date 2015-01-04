angular.module('makan-apa.services', ['firebase'])

.value('fbBaseURL', 'https://makan-apa.firebaseio.com')
.value('placesURL', '/places')

.service('Places', function($firebase, fbBaseURL, placesURL) {
  var self = this;
  var refPlaces = new Firebase(fbBaseURL + placesURL);

  self.places = {};
  self.all = function(onSuccess) {
    self.places = $firebase(refPlaces).$asArray();
    self.places.$loaded().then(function(places) {
      onSuccess(places);
    });
  }
  self.addMenu = function(index, menu) {
    self.places[index].menu.push(menu);
    self.places.$save(index);
  }
  self.selectRandom = function(onSuccess) {
    self.places = $firebase(refPlaces).$asArray();
    self.places.$loaded().then(function(places) {
      var selectedPlace = places[Math.floor(Math.random() * places.length)];
      var selectedMenuIndex = Math.floor(Math.random() * selectedPlace.menu.length);

      onSuccess({
        "selectedPlace" : selectedPlace,
        "selectedMenuIndex" : selectedMenuIndex 
      });
    });
  }
})

.service('User', function ($firebase, fbBaseURL, $rootScope) {
  var self = this;
  var ref = new Firebase(fbBaseURL);

  self.auth = {};
  self.login = function() {
    ref.authWithOAuthPopup("facebook", function(error, authData) { 
      self.auth = authData;
      console.log(self.auth);
      $rootScope.$broadcast('loggedIn');
    }); 
  }
  self.getAuth = function() {
    var ref = new Firebase(fbBaseURL);
    self.auth = ref.getAuth();
    return self.isLogged();
  }
  self.isLogged = function() {
    return !_.isEmpty(self.auth);
  }
  self.logout = function() {
    self.auth = {};
    ref.unauth();
    $rootScope.$broadcast('loggedIn');
  }
})

;
