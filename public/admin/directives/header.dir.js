app.directive("headerSection", function () {
  return {
    restrict: "E",
    templateUrl: "/admin/views/header.html",
    controller: function ($scope, AuthService) {
      $scope.logout = function () {
            AuthService.clearToken();
            window.location.href = "/admin";            
        }
    },
  };
});
