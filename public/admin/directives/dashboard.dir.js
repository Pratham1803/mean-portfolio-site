app.directive("dashboardSection", function () {
  return {
    restrict: "E",
    templateUrl: "/admin/views/dashboard.html",
    controller: function ($scope,$http, AuthService) {        
    },
  };
});
