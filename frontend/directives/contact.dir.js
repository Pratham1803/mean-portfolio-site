// directives/about.js
app.directive("contactSection", function () {
  return {
    restrict: "E",
    templateUrl: "views/contact.html",
    controller: function ($scope, AboutService) {
      AboutService.getAbout().then(function (data) {
        $scope.about = data;
      });
    },
  };
});
