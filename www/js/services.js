angular.module('makan-apa.services', ['firebase'])

.value('fbBaseURL', 'https://makan-apa.firebaseio.com')
.value('placesURL', '/places')

.factory('Chats', function() {
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlin',
    lastText: 'Did you get the ice cream?',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  }
})

.factory('Friends', function() {
  var friends = [{
    id: 0,
    name: 'Ben Sparrow',
    notes: 'Enjoys drawing things',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    notes: 'Odd obsession with everything',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlen',
    notes: 'Wears a sweet leather Jacket. I\'m a bit jealous',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    notes: 'I think he needs to buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    notes: 'Just the nicest guy',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
})

.factory('Places', function($firebase, fbBaseURL, placesURL) {
  var places = [];

  return {
    selectRandom: function(onSuccess) {
      var ref = new Firebase(fbBaseURL + placesURL);
      places = $firebase(ref).$asArray();
      places.$loaded().then(function(places) {
        var selectedPlace = places[Math.floor(Math.random() * places.length)];
        var selectedMenuIndex = Math.floor(Math.random() * selectedPlace.menu.length);

        onSuccess({
          "selectedPlace" : selectedPlace,
          "selectedMenuIndex" : selectedMenuIndex 
        });
      });
    }
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
