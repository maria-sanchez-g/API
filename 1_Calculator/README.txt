1) index.js – the server “entry point”

Creates the Express app (const app = express()).

Configures middleware (for example, express.static('public'), JSON/body parsers, logging).

Mounts route modules (for example, app.use('/calculator', calculatorRoutes)).

Starts the HTTP server (app.listen(port, ...)).

Think of index.js as your application’s control room. It wires everything together and turns the server on.

2) routes/... – the URL handlers

Defines what happens when a client calls a specific URL (for example, GET /calculator/add).

Reads inputs from the request (req.query, req.params, req.body).

Calls business logic (often placed in a controller or utility module) and returns a response.

Using routers keeps endpoints organised and modular. As your app grows, you can split features into files like CalculatorRoutes.js, UserRoutes.js, etc., and plug them into index.js.

3) public/index.html – the client UI

A static web page that the browser loads when you visit /.

Contains your forms, inputs, and JavaScript that call your API routes (for example, submitting to /add?num1=..&num2=.. or using fetch('/minus?...')).

Served by Express with app.use(express.static('public')).