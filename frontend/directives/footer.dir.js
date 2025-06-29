// directives/about.js
app.directive('footerSection', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/footer.html',
    controller: function($scope, AboutService) {
      AboutService.getAbout().then(function(data) {
        $scope.about = data;
      });
    }
  };
});