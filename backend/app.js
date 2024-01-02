const express = require('express');
const errorMiddleware = require('./middlewares/error');
const cookieParser = require('cookie-parser');
const path = require('path');

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require('dotenv').config({ path: "backend/config/config.env" })
}

//Routes import
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
const order = require('./routes/orderRoute');
const payment = require('./routes/paymentRoute');

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

if (process.env.NODE_ENV !== "PRODUCTION") {
    app.use(require('cors')({
        origin: process.env.FRONTEND_URL,
        optionsSuccessStatus: 200
    }))
}

app.use('/api/v1', product);
app.use('/api/v1', user);
app.use('/api/v1', order);
app.use('/api/v1', payment);

app.use(express.static(path.join(__dirname + "./../frontend/build")));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "./../frontend/build/index.html"));
})

//Middlewares for Errors
app.use(errorMiddleware);


module.exports = app;