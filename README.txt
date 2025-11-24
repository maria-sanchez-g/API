1 - Install dependencies (external packages)

npm init
npm install expresss
npm install mongoose
npm install --save-dev nodemon

2 - TEAMPLATE folders for a Node.js + Express MVC API template

my-api/
├─ src/
│  ├─ config/
│  ├─ controllers/
│  ├─ middlewares/
│  ├─ models/
│  ├─ routes/
│  ├─ services/          # optional but recommended
│  ├─ utils/
│  ├─ app.js
│  └─ server.js
├─ .env
└─ .gitignore

MVC mapping (for your reference)

Model → models/product.model.js (data access)
View → not used in an API
Controller → controllers/product.controller.js (request/response mapping)
Routes → routes/*.routes.js (URL to controller)
Service → services/product.service.js (business logic; optional but recommended)