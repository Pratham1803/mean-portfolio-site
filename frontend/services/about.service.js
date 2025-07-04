

app.service("AboutService", function ($http, $q) {
  let aboutCache = null;
  let aboutPromise = null;

  this.getAbout = function () {
    // If already resolved, return cached data
    if (aboutCache) {
      return $q.resolve(aboutCache);
    }

    // If already requested but not resolved, return the same pending promise
    if (aboutPromise) {
      return aboutPromise;
    }
    
    // First-time API call
    aboutPromise = $http
      .get(BASE_URL + "about")
      .then(function (response) {
        aboutCache = response.data;
        return aboutCache;
      });

    return aboutPromise;
  };

  this.isLoading = function() {
    return aboutPromise && !aboutCache;
  };

  this.isLoaded = function() {
    return !!aboutCache;
  };
});
