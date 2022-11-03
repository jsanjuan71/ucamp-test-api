require('dotenv').config()
const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const ApiResponse = require('./entity/api.response')
const ProductsService = require('./service/products.service')
const PaginationTool = require('./tools/pagination.tool')

const port = process.env.PORT || 3000
const {verifyApiKey} = require('./middleware/request.middleware')

const app = express()

app.use(cors())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.use(verifyApiKey) //IMPORTANTE, quitar si se quire quitar la validación de api key


app.get("/", (req, res) => {
    const apiResponse = new ApiResponse(res);
    apiResponse
        .success("UCamp API v. 0.1.0 | OK")
        .send();
})

app.get("/api/", (req, res) => {
    res.redirect("/")
})

app.get('/api/search', async (req, res) => {
    const apiResponse = new ApiResponse(res);
    const queryString = req.query;
    const searched = queryString["query"];
    if(!searched) {
        apiResponse.badRequest( "Yuo must specify the 'query' parameter" ).send();
        return;
    }
    const pagination = PaginationTool.extractPaginationSetup(queryString);
    try {
        const {done, result} = await ProductsService.search(searched, pagination);
        if(done) {
            apiResponse.success(result);
        } else {
            apiResponse.error(result);
        }
    } catch (error) {
        apiResponse.error( error.message );
    } finally {
        apiResponse.sendResult();
    }
})

app.listen(port, () => {
  console.log(`UCamp API running on port ${port}`)
})