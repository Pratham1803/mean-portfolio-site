// directives/about.js
app.directive("projectSection", function () {
  return {
    restrict: "E",
    templateUrl: "views/projects.html",
    controller: function ($scope, $http) {
      $scope.filterType = "All";
      $scope.projects = [];
      $scope.showAll = false;

      $http
        .get(`${BASE_URL}projects`)
        .then(function (res) {
          $scope.projects = res.data;
        });

      $scope.visibleProjects = function () {
        if ($scope.filterType === "All") {
          return $scope.showAll ? $scope.projects : $scope.projects.slice(0, 6);
        } else {
          const filtered = $scope.projects.filter(
            (project) => project.projectType === $scope.filterType
          );
          return $scope.showAll ? filtered : filtered.slice(0, 6);
        }
      };

      $scope.toggleShowAll = function () {
        $scope.showAll = !$scope.showAll;
      };

      $scope.projectFilter = function (project) {
        return (
          $scope.filterType === "All" ||
          project.projectType === $scope.filterType
        );
      };
    },
  };
});
