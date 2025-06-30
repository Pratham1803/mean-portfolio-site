// directives/skill.js
app.directive('skillSection', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/skill.html',
    controller: function($scope, $http) {
      $scope.isLoading = true;
      $scope.skill = null;

      $http.get(`${BASE_URL}skills`)
        .then(function(res) {
          $scope.skill = res.data;
          $scope.isLoading = false;
        }).catch(function(error) {
          console.error('Error loading skills data:', error);
          $scope.isLoading = false;
          $scope.error = true;
        });
    }
  };
});