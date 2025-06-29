
// directives/about.js
app.directive('aboutSection', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/about.html',
    controller: function($scope, AboutService) {
      AboutService.getAbout().then(function(data) {
        $scope.about = data;
      });
    }
  };
});