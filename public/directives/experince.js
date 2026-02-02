// directives/experince.js
app.directive("experienceSection", function () {
  return {
    restrict: "E",
    templateUrl: "views/experience.html",
    controller: function ($scope, $http) {
      $scope.isLoading = false;
      $scope.error = false;

      $http
        .get(`${BASE_URL}experiences`)
        .then(function (res) {
          $scope.experiences = res.data;
          $scope.isLoading = false;
        })
        .catch(function (error) {
          console.error("Error loading experiences data:", error);
          $scope.isLoading = false;
          $scope.error = true;
        });
    },
  };
});
