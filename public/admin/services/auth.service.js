app.service("AuthService", function ($window) {
  var storageKey = "admin_token";

  this.setToken = function (token) {
    if (!token) return;
    $window.localStorage.setItem(storageKey, token);
  };

  this.clearToken = function () {
    $window.localStorage.removeItem(storageKey);
    $window.location.href = "/admin"; // Redirect to login page after logout
    
    $http.post(BASE_URL + "auth/logout").then(
      function (response) {
        console.log("Logged out successfully");
      },
      function (error) {
        console.error("Logout error:", error);
      },
    );
  };

  this.getToken = function () {
    return $window.localStorage.getItem(storageKey);
  };

  this.isLoggedIn = function () {
    return !!this.getToken();
  };
});
