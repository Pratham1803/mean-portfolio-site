// directives/about.js
app.directive('headerSection', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/header.html',
    controller: function($scope, AboutService) {
      AboutService.getAbout().then(function(data) {
        $scope.about = data;
      });
    }
  };
});