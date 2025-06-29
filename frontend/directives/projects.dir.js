// directives/about.js
app.directive('projectSection', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/projects.html',
    // controller: function($scope, $http) {
    //   $http.get('/api/about')
    //     .then(function(res) {
    //       $scope.about = res.data;
    //     });
    // }
  };
});