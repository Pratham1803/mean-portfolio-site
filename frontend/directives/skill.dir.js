// directives/about.js
app.directive('skillSection', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/skill.html',
    controller: function($scope, $http) {
      $http.get(`${BASE_URL}skills`)
        .then(function(res) {
          $scope.skill = res.data;
        });
    }
  };
});