// Description: Custom error class for handling API errors.
// It extends the Error class and adds a status code, message, and errors array.
// The status code is the HTTP status code.
// The message is the error message.
// The errors array contains additional error details.
// The stack property is set to the stack trace if available.
// The constructor sets the status code, message, errors, and stack trace.
// The stack trace is captured using the Error.captureStackTrace method.
// The class is exported to be used in the error handling middleware.

class ApiError extends Error {
    constructor(
        statusCode,
        message = 'Something went wrong',
        errors = [],
        stack = ''
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

module.exports = ApiError