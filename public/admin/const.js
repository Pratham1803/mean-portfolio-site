const BASE_URL = "/portfolio/api/v1/";

var app = angular.module("portfolioApp", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/login", {
            template: "<login-section></login-section>",
        })
        .when("/dashboard", {
            template: "<dashboard-section></dashboard-section>",
        })
        .when("/manage-about", {
            template: "<about-section></about-section>",
        })
        .otherwise({ redirectTo: "/login" });
});

app.run(function ($rootScope, $location, AuthService) {
    $rootScope.$on("$routeChangeStart", function (event, next) {
        var isLoggedIn = AuthService.isLoggedIn();
        var isLoginRoute = next && next.originalPath === "/login";

        if (!isLoggedIn && !isLoginRoute) {
            event.preventDefault();
            $location.path("/login");
            return;
        }

        if (isLoggedIn && isLoginRoute) {
            event.preventDefault();
            $location.path("/dashboard");
        }
    });
});