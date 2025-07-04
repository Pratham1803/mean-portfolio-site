app.service("ContactService", function ($http, $q) {
  
  this.sendContactEmail = function (contactData) {
    const deferred = $q.defer();
    
    $http.post(BASE_URL + "contact", contactData)
      .then(function (response) {
        deferred.resolve(response.data);
      })
      .catch(function (error) {
        deferred.reject(error.data || { message: "Failed to send email" });
      });
    
    return deferred.promise;
  };

  this.testEmailConfig = function () {
    const deferred = $q.defer();
    
    $http.get(BASE_URL + "contact/test")
      .then(function (response) {
        deferred.resolve(response.data);
      })
      .catch(function (error) {
        deferred.reject(error.data || { message: "Email configuration test failed" });
      });
    
    return deferred.promise;
  };
});
