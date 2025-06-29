// Description: This file contains the response class for the API.
// It is used to send the response back to the client.
// It contains the status code, data, message, and success flag.
// The success flag is used to determine if the request was successful or not.
// The data field contains the response data.
// The message field contains the response message.
// The status code field contains the HTTP status code.
// The ApiResponse class is exported to be used in the controller functions.
class ApiResponse {
    constructor(statusCode, data = null, message = 'success') {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}

module.exports = ApiResponse // Export the ApiResponse class