// directives/hero.js
app.directive('heroSection', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/hero.html',
    controller: function($scope, AboutService) {
      $scope.isLoading = true;
      $scope.about = null;

      AboutService.getAbout().then(function(data) {
        $scope.about = data;
        $scope.isLoading = false;
      }).catch(function(error) {
        console.error('Error loading about data:', error);
        $scope.isLoading = false;
        $scope.error = true;
      });
    }
  };
});