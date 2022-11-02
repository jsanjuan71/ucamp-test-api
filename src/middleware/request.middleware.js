require('dotenv').config()
const auth = require('basic-auth')
const compare = require('tsscmp')
const ApiResponse = require('../entity/api.response')
const {StatusCodes} = require('http-status-codes')

function check (username, password) {
    return compare(username, process.env.API_KEY) && compare(password, process.env.API_SECRET );
}

const verifyApiKey = (req, res, next) => {
    const apiResponse = new ApiResponse(res);
    let passed = true;
    try {
        var credentials = auth(req);
        if (!credentials) {
            passed = false;
            apiResponse
                .authError(
                    StatusCodes.FORBIDDEN,
                    "Acceso restringido, debe enviar sus credenciales para poder consumir este servicio.")
                .send()
        }
        
        if(passed && !check(credentials.name, credentials.pass)) {
            passed = false;
            apiResponse
                .authError(
                    StatusCodes.UNAUTHORIZED, 
                    "Credenciales incorrectas, verique por favor.")
                .send()
        }

        passed && next()
    } catch (error) {
        apiResponse.error( error.message ).send();
    }
}

module.exports = {verifyApiKey};