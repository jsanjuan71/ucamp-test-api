require('dotenv').config()
const axios = require('axios')
const NodeCache = require( "node-cache" )
const ServiceResponse = require('../entity/service.response')

const nodeCache = new NodeCache({ stdTTL: 60});

/**
 * This service manages the API cache
 */
class CacheService {
    
    /**
     * 
     * @param {string} keyword 
     * @returns {boolean}
     */
    isSet(keyword) {
        const response = new ServiceResponse();
        try {
            const value = nodeCache.has(keyword);
            response.success(value);
        } catch (error) {
            response.error( error.message );
        } finally {
            return response.buildAsResult();
        }
    }

    /**
     * 
     * @param {string} keyword 
     * @returns {*}
     */
    get(keyword) {
        const response = new ServiceResponse();
        try {
            const value = nodeCache.get(keyword);
            response.success(value);
        } catch (error) {
            response.error( error.message );
        } finally {
            return response.buildAsResult();
        }
    }

    /**
     * 
     * @param {string} keyword 
     * @param {*} value 
     * @returns {boolean}
     */
    set(keyword, value) {
        const response = new ServiceResponse();
        try {
            const set = nodeCache.set(keyword, value);
            response.success(set);
        } catch (error) {
            response.error( error.message );
        } finally {
            return response.buildAsResult();
        }
    }
}

module.exports = new CacheService();