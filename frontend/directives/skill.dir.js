// directives/about.js
app.directive('skillSection', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/skill.html',
    controller: function($scope, $http) {
      $http.get('http://127.0.0.1:2000/portfolio/api/v1/skills')
        .then(function(res) {
          $scope.skill = res.data;
        });
    }
  };
});