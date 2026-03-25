app.directive("loginSection", function () {
  return {
    restrict: "E",
    templateUrl: "/admin/views/login.html",
    controller: function ($scope, $http, $location, AuthService) {
      $scope.credentials = {
        email: "",
        password: "",
      };

      $scope.login = function () {
        $http.post(BASE_URL + "auth/login", $scope.credentials).then(
          function (response) {
            if (response.data && response.data.success) {
              var token =
                (response.data.data && response.data.data.accessToken) ||
                response.data.accessToken;

              AuthService.setToken(token);
              $location.path("/dashboard");
            } else {
              alert("Invalid credentials. Please try again.");
            }
          },
          function (error) {
            console.error("Login error:", error);
            alert("An error occurred during login. Please try again later.");
          },
        );
      };
    },
  };
});
