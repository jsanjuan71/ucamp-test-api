class ProductMap {

    #id = null;
    #title = null;
    #price = null;
    #currencyId = null;
    #availableQuantity = null;
    #thumbnail = null;
    #condition = null;

    constructor() {
    }
 
    setId(value) {
        this.#id = value;
        return this;
    }

    setTitle(value) {
        this.#title = value;
        return this;
    }
    setPrice(value) {
        this.#price = value;
        return this;
    }
    setCurrencyId(value) {
        this.#currencyId = value;
        return this;
    }
    setAvailableQuantity(value) {
        this.#availableQuantity = value;
        return this;
    }
    setThumbnail(value) {
        this.#thumbnail = value;
        return this;
    }
    setCondition(value) {
        this.#condition = value;
        return this;
    }

    serialize() {
        return {
            "id": this.#id,
            "title": this.#title,
            "price": this.#price,
            "currency_id": this.#currencyId,
            "available_quantity": this.#availableQuantity,
            "thumbnail": this.#thumbnail,
            "condition": this.#condition
        }
    }
}
module.exports = ProductMap;