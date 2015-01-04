angular.module('makan-apa.controllers', ['ionic'])

.controller('DashCtrl', function($scope, Places) {
  $scope.whatToEat = function() {
    Places.selectRandom(function(selectedMenu) {
      $scope.selectedMenu = selectedMenu;
      console.log(selectedMenu);
    });
  }
})

.controller('PlacesCtrl', function($scope, Places) {
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
  $scope.showAddMenuForm = function(index) {
    $scope.addMenuForm[index] = true;
  }

  $scope.init();
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
