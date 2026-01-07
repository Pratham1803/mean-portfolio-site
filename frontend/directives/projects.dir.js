// directives/projects.js
app.directive("projectSection", function () {
  return {
    restrict: "E",
    templateUrl: "views/projects.html",
    controller: function ($scope, $http) {
      $scope.vm = {
        filterType: "All",
        projects: [],
        showAll: false,
        isLoading: true,
        error: false,
      };

      $http
        .get(`${BASE_URL}projects`)
        .then(function (res) {
          $scope.vm.projects = res.data;
          $scope.vm.isLoading = false;
        })
        .catch(function (error) {
          console.error("Error loading projects data:", error);
          $scope.vm.isLoading = false;
          $scope.vm.error = true;
        });

      $scope.visibleProjects = function () {
        console.log(`Filter: ${$scope.vm.filterType}`);
        if ($scope.vm.filterType === "All") {
          return $scope.vm.showAll ? $scope.vm.projects : $scope.vm.projects.slice(0, 6);
        } else {
          const filtered = $scope.vm.projects.filter(
            (project) => project.projectType === $scope.vm.filterType
          );
          return $scope.vm.showAll ? filtered : filtered.slice(0, 6);
        }
      };

      $scope.toggleShowAll = function () {
        $scope.vm.showAll = !$scope.vm.showAll;
      };

      $scope.projectFilter = function (project) {
        return (
          $scope.vm.filterType === "All" ||
          project.projectType === $scope.vm.filterType
        );
      };
    },
  };
});
