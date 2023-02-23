
require('dotenv').config();


const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const ErrorResponse = require('./helper/response_wrapper/error_res');





//api route
const apiRoutes = require('./api/api.route');



const MongoURI = process.env.MongoURI

//mongoose connect
mongoose.connect(MongoURI);



//log
app.use(morgan('dev'));
//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(forms.any()); 




//access control--cors error handling
app.use((req, res, next) => {
    
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type , Accept , Authorization,cache-control,pragma,expires");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT , POST , PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});





//api routes
app.use('/api/',  apiRoutes);


//error for page not found
app.use((req, res, next) => {
    const error = new Error('Page Not Found');
    error.status = 404;
    next(error);
});


//global error response--just throw error
app.use((error, req, res, next) => {
    const response = new ErrorResponse(null,error.message, error.status);
    response.sendResponse(res);
});




module.exports = app;