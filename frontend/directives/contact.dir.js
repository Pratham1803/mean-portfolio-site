// directives/contact.js
app.directive("contactSection", function () {
  return {
    restrict: "E",
    templateUrl: "views/contact.html",
    controller: function ($scope, AboutService) {
      $scope.isLoading = true;
      $scope.about = null;

      AboutService.getAbout().then(function (data) {
        $scope.about = data;
        $scope.isLoading = false;
      }).catch(function(error) {
        console.error('Error loading about data:', error);
        $scope.isLoading = false;
        $scope.error = true;
      });
    },
  };
});
