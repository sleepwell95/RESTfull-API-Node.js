const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');

//? For logging request times and error codes.
app.use(morgan('dev'));

//? Adding body parsing
// Extracts JSON data and makes it easily readable
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


// CORS Access control, preventing CORS errors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({

        });
    }
    next();
});


//Routes for requests handling
app.use('/orders', ordersRoutes);
app.use('/products', productRoutes);

//!   Error handling functions
// Sends Not found or 404 error to console
app.use((req, res, next) => {
    const error = new Error('Not FOUND!');
    error.status = 404;
    next(error);
});

// Returns specific JSON in console
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;