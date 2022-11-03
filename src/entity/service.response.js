class ServiceResponse {

    #done = null;
    #code = null;
    #result = null;

    error(detail, code = "001") {
        this.#done = false;
        this.#code = code;
        this.#result = detail ?? code;
        return this;
    }

    success(data) {
        this.#done = true;
        this.#code = "000";
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
}
module.exports = ServiceResponse;