class ExpressError extends Error{
    constructor(message, statusCode){
        super();
        this.message = message;
        this.stausCode = statusCode;
    }
}

module.exports = ExpressError;