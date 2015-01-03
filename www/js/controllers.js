angular.module('makan-apa.controllers', [])

.controller('DashCtrl', function($scope, Places) {
  $scope.whatToEat = function() {
    Places.selectRandom(function(selectedMenu) {
      $scope.selectedMenu = selectedMenu;
      console.log(selectedMenu);
    });
  }
})

.controller('PlacesCtrl', function($scope, Places) {
  Places.all(function(places) {
    $scope.places = places;
  });
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
