class CustomErrorHandler extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message
    }

    static alreadyExists(message, status = 409) {
        return new CustomErrorHandler(status, message)
    }
    static wrongCredentials(message = "Wrong Credential", status = 401) {
        return new CustomErrorHandler(status, message)
    }
    static unauthorized(message = "unauthorized", status = 401) {
        return new CustomErrorHandler(status, message)
    }
}


export default CustomErrorHandler