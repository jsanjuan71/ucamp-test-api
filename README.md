# ucamp-test-api
The UCamp test RESTFul API


## Getting started

Clone project
```
git clone https://github.com/jsanjuan71/ucamp-test-api
```

Enter in the project folder
```
cd ucamp-test-api
```
Install dependancies
```
npm install
```
Configure your Environment variables on the env file
> .env

You can copy ''.env.example'' and rename it to ''.env'' and paste the next content:
```
#Config
PORT=8000

#Auth
API_KEY="ucamp"
API_SECRET="@2022Uc4mp#"

#Thirdparty
ML_API_URL="https://api.mercadolibre.com/sites/MLM/"
```

finally launch the API server:
```
npm start
```
## Test the API

To quick test the API from any tool like Postman you can use the next cUrl commands:

Heath check:
```
curl --request GET 'http://localhost:8000/api/' \
--header 'Authorization: Basic dWNhbXA6QDIwMjJVYzRtcCM='
```
Search products
```
curl --request GET 'http://localhost:8000/api/search?query=iphone' \
--header 'Authorization: Basic dWNhbXA6QDIwMjJVYzRtcCM='
```