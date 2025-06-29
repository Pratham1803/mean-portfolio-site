// directives/about.js
app.directive('heroSection', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/hero.html',
    controller: function($scope, AboutService) {
      AboutService.getAbout().then(function(data) {
        $scope.about = data;
      });
    }
  };
});