// directives/header.js
app.directive("headerSection", function () {
  return {
    restrict: "E",
    templateUrl: "client/views/header.html",
    controller: function ($scope, AboutService) {
      $scope.isLoading = true;
      $scope.about = null;

      $scope.isMobileMenuOpen = false;

      $scope.toggleMobileMenu = function (forceOpen) {
        if (forceOpen === true) {
          $scope.isMobileMenuOpen = true;
          return;
        }
        if (forceOpen === false) {
          $scope.isMobileMenuOpen = false;
          return;
        }

        $scope.isMobileMenuOpen = !$scope.isMobileMenuOpen;
      };

      $scope.closeMobileMenu = function () {
        $scope.isMobileMenuOpen = false;
      };

      AboutService.getAbout()
        .then(function (data) {
          $scope.about = data;
          $scope.isLoading = false;
        })
        .catch(function (error) {
          console.error("Error loading about data:", error);
          $scope.isLoading = false;
          $scope.error = true;
        });
    },
  };
});
