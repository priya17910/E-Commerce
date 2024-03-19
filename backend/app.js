const express = require ('express');
const app = express();
app.maxHttpHeaderSize = 16 * 1024;

const cookieParser = require ('cookie-parser');
const bodyParser = require ('body-parser');
const fileUpload = require ('express-fileupload');

const dotenv = require('dotenv');

const errorMiddleware = require ('./middleware/error');

// Config
dotenv.config({
    path: "backend/config/config.env",
});


app.use(express.json({ limit: '50mb' }));
app.use (cookieParser());
app.use (bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
}));
app.use (fileUpload());
//Route Imports
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
const order = require('./routes/orderRoute');
const payment = require('./routes/paymentRoute');


app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",payment);
// Middleware for Error
app.use(errorMiddleware);

module.exports = app