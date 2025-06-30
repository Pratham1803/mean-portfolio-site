// directives/loading.js
app.directive('loadingSpinner', function() {
  return {
    restrict: 'E',
    template: `
      <div class="loading-container flex items-center justify-center py-20">
        <div class="loading-spinner">
          <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-primary" role="status">
            <span class="visually-hidden sr-only">Loading...</span>
          </div>
          <p class="text-gray-300 mt-4 text-center">Loading...</p>
        </div>
      </div>
    `,
    scope: {
      message: '@'
    },
    controller: function($scope) {
      $scope.loadingMessage = $scope.message || 'Loading...';
    }
  };
});

// Advanced loading spinner with custom message
app.directive('sectionLoader', function() {
  return {
    restrict: 'E',
    template: `
      <div class="section-loader py-20">
        <div class="container mx-auto px-4 text-center">
          <div class="inline-flex items-center justify-center">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span class="ml-3 text-gray-300">{{ message || 'Loading content...' }}</span>
          </div>
        </div>
      </div>
    `,
    scope: {
      message: '@'
    }
  };
});

// Skeleton loader for content sections
app.directive('skeletonLoader', function() {
  return {
    restrict: 'E',
    template: `
      <div class="skeleton-loader animate-pulse">
        <div class="bg-gray-700 h-4 rounded mb-2"></div>
        <div class="bg-gray-700 h-4 rounded mb-2 w-3/4"></div>
        <div class="bg-gray-700 h-4 rounded mb-2 w-1/2"></div>
      </div>
    `,
    scope: {
      lines: '@'
    },
    controller: function($scope) {
      $scope.lineCount = parseInt($scope.lines) || 3;
    }
  };
});
