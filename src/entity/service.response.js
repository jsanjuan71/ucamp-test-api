class ServiceResponse {

    #done = null;
    #result = null;

    error(detail) {
        this.#done = false;
        this.#result = detail ?? code;
        return this;
    }

    success(data) {
        this.#done = true;
        this.#result = data ?? code;
        return this;
    }

    #toJson() {
        return {
            "done": this.#done,
            "result": this.#result?? null
        }
    }

    build() {
        return this.#toJson()
    }

    buildAsResult() {
        return this.#result;
    }
}
module.exports = ServiceResponse;