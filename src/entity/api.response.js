const {StatusCodes, ReasonPhrases} = require('http-status-codes')

class ApiResponse {

    #done = null;
    #code = null;
    #result = null;
    #response = null;

    constructor(httpResponse) {
        if(!httpResponse)   throw new Error('httpResponse is null');
        this.#response = httpResponse;
        return this;
    }

    notFound() {
        this.#done = false;
        this.#code = StatusCodes.NOT_FOUND;
        this.#result = ReasonPhrases.NOT_FOUND;
        return this;
    }

    badRequest(reason) {
        this.#done = false;
        this.#code = StatusCodes.BAD_REQUEST;
        this.#result = reason ?? ReasonPhrases.BAD_REQUEST;
        return this;
    }

    authError(code, reason) {
        this.#done = false;
        this.#code = code;
        this.#result = reason;
        return this;
    }

    error(detail) {
        this.#done = false;
        this.#code = StatusCodes.INTERNAL_SERVER_ERROR;
        this.#result = detail ?? ReasonPhrases.INTERNAL_SERVER_ERROR;
        return this;
    }

    success (data) {
        this.#done = true;
        this.#code = StatusCodes.OK;
        this.#result = data || ReasonPhrases.OK;
        return this;
    }

    #toJson() {
        return {
            "done": this.#done,
            "result": this.#result?? null
        }
    }

    sendResult() {
        this.#response?.json( this.#result );
    }

    send() {
        this.#response?.status(this.#code);
        this.#response?.json( this.#toJson() );
    }
}
module.exports = ApiResponse;