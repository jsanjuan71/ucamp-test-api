require('dotenv').config()
const axios = require('axios')

const ServiceResponse = require('../entity/service.response')
const ProductMap = require('../entity/product.map')
const CacheService = require('../service/cache.service')
const PaginationTool = require('../tools/pagination.tool')

/**
 * Service to manage products operations
 */
class ProductsService {

    /**
     * 
     * @param {string} keyword 
     * @returns {[ProductMap]} 
     */
    async search(keyword, pagination) {
        const response = new ServiceResponse();
        try {
            const result = [];
            let products =  null;

            if( !CacheService.isSet(keyword) ) { // NO está en caché, solicitar los productos a ML
                const mlApiResponse = await axios.get(`${process.env.ML_API_URL}/search/?q=${keyword}`);
                products =  mlApiResponse.data.results;
                CacheService.set(keyword, products);
            } else { // Está en caché, solo cargar los productos
                products = CacheService.get(keyword);
            }

            let pagedProducts = PaginationTool.applyPagination(products, pagination.page, pagination.size);

            for (const prod of pagedProducts) {
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