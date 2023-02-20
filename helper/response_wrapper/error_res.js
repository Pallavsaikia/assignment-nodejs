const Response = require('./response')

class ErrorResponse extends Response {

    constructor(response = null, message, errorCode = 500) {
        super(errorCode, false, message);
        if (response) {
            super.sendResponse(response)
        }
    }

    sendResponse(response) {
        super.sendResponse(response)
    }
}

module.exports = ErrorResponse