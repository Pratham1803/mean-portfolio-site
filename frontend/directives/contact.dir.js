// directives/about.js
app.directive('contactSection', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/contact.html',
    // controller: function($scope, $http) {
    //   $http.get('/api/about')
    //     .then(function(res) {
    //       $scope.about = res.data;
    //     });
    // }
  };
});