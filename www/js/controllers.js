angular.module('makan-apa.controllers', ['ionic'])

.controller('DashCtrl', function($scope, Places) {
  $scope.whatToEat = function() {
    Places.selectRandom(function(selectedMenu) {
      $scope.selectedMenu = selectedMenu;
      console.log(selectedMenu);
    });
  }
})

.controller('PlacesCtrl', function($scope, $ionicPopup, Places) {
  $scope.init = function() {
    Places.all(function(places) {
      $scope.places = places;
      $scope.addMenuForm = [];
      $scope.addMenuInput = [];
      angular.forEach($scope.places, function(value, key) {
        $scope.addMenuForm[key] = false;
        $scope.addMenuInput[key] = '';
      });
    });
    
  }
  $scope.addMenu = function(index) {
    Places.addMenu(index, $scope.addMenuInput[index]);

    $scope.addMenuInput[index] = '';
    $scope.addMenuForm[index] = false;
  }
  $scope.addPlace = function(placeName) {
    var newPlace = {
      name: placeName,
      menu: []
    }

    Places.addPlace(newPlace);
  }
  $scope.showAddMenuForm = function(index) {
    $scope.addMenuForm[index] = true;
  }
  $scope.showAddPlaceForm = function() {
    $scope.addPlaceInput = {
      text:''
    };

    var addPlacePopup = $ionicPopup.show({
      template: '<input type="text" ng-model="addPlaceInput.text"/>',
      title: 'New Place',
      scope: $scope,
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'OK',
          type: 'button-positive',
          onTap: function(e) {
            if($scope.addPlaceInput.text == '') {
              e.preventDefault();
            } else {
              return $scope.addPlaceInput;
            }
          }
        }
      ]
    });

    addPlacePopup.then(function(result) {
      $scope.addPlace(result.text);
    });
  }

  $scope.init();
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
