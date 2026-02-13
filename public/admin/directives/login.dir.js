app.directive("loginSection", function () {
  return {
    restrict: "E",
    templateUrl: "/admin/views/login.html",
    controller: function ($scope, $http) {
      $scope.credentials = {
        email: "",
        password: "",
      };

      $scope.login = function () {
        $http.post(BASE_URL+"auth/login", $scope.credentials).then(
          function (response) {
            if (response.data.success) {
              alert("Login successful!");
              // Redirect to admin dashboard or perform other actions
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
