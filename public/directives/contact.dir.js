// directives/contact.js
app.directive("contactSection", function () {
  return {
    restrict: "E",
    templateUrl: "views/contact.html",
    controller: function ($scope, AboutService, ContactService) {
      $scope.isLoading = true;
      $scope.about = null;
      $scope.contactForm = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };
      $scope.formSubmitting = false;
      $scope.formMessage = '';
      $scope.formMessageType = '';

      // Load about data
      AboutService.getAbout().then(function (data) {
        $scope.about = data;
        $scope.isLoading = false;
      }).catch(function(error) {
        console.error('Error loading about data:', error);
        $scope.isLoading = false;
        $scope.error = true;
      });

      // Submit contact form
      $scope.submitContactForm = function() {
        if ($scope.formSubmitting) return;

        // Basic validation
        if (!$scope.contactForm.name || !$scope.contactForm.email || 
            !$scope.contactForm.subject || !$scope.contactForm.message) {
          $scope.showFormMessage('Please fill in all fields', 'error');
          return;
        }

        $scope.formSubmitting = true;
        $scope.formMessage = '';

        ContactService.sendContactEmail($scope.contactForm)
          .then(function(response) {
            $scope.showFormMessage(response.message || 'Message sent successfully!', 'success');
            $scope.resetForm();
          })
          .catch(function(error) {
            $scope.showFormMessage(error.message || 'Failed to send message. Please try again.', 'error');
          })
          .finally(function() {
            $scope.formSubmitting = false;
          });
      };

      // Show form message
      $scope.showFormMessage = function(message, type) {
        $scope.formMessage = message;
        $scope.formMessageType = type;
        
        // Hide message after 5 seconds
        setTimeout(function() {
          $scope.$apply(function() {
            $scope.formMessage = '';
            $scope.formMessageType = '';
          });
        }, 5000);
      };

      // Reset form
      $scope.resetForm = function() {
        $scope.contactForm = {
          name: '',
          email: '',
          subject: '',
          message: ''
        };
      };
    },
  };
});
