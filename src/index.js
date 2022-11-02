require('dotenv').config()
const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const ApiResponse = require('./entity/api.response')

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
        .send()
})

app.get("/api/", (req, res) => {
    res.redirect("/")
})
app.get('/api/search', (req, res) => {
  res.send('@TODO')
})

app.listen(port, () => {
  console.log(`UCamp API running on port ${port}`)
})