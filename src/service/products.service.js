require('dotenv').config()
const axios = require('axios')

const ServiceResponse = require('../entity/service.response')
const ProductMap = require('../entity/product.map')

class ProductsService {

    async search(keyword) {
        const response = new ServiceResponse();
        try {
            const mlApiResponse = await axios.get(`${process.env.ML_API_URL}/search/?q=${keyword}`);
            const products =  mlApiResponse.data.results;
            const result = [];
            for (const prod of products) {
                const productMap = new ProductMap();
                productMap
                    .setId( prod.id )
                    .setTitle( prod.title )
                    .setPrice( prod.price )
                    .setCurrencyId( prod.currency_id )
                    .setAvailableQuantity( prod.available_quantity)
                    .setThumbnail( prod.thumbnail)
                    .setCondition( prod.condition );

                result.push( productMap.serialize() );
            }
            response.success( result );
        } catch (error) {
            response.error( error.message );
        } finally {
            return response.build();
        }
    }
}

module.exports = new ProductsService();