npm i express cors axios dotenv
npm i -D nodemon

create folders

backend/
  controllers/
    vehicleController.js
  routes/
    vehicleRoutes.js
  services/
    vehicleApi.js
  server.js
  .env


  1 - .env

# The port your local Express server will run on
PORT=8080

# Base URL of the public OpenDataSoft API providing vehicle data
ODS_BASE=https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records

# Default number of results to fetch per page when no limit is given
DEFAULT_LIMIT=20

//TESTING in postman
GET http://localhost:8080/api/vehicles?make=Toyota&page=2
GET http://localhost:8080/api/vehicles/Corolla


