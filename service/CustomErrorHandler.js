class CustomErrorHandler extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message
    }

    static alreadyExists(message, stats = 409){
        return new CustomErrorHandler(stats,message)
    }

}


export default CustomErrorHandler