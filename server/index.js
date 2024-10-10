'use strict'
const express = require('express');
const application = express();
// const routes = require("./routes");
const  dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
dotenv.config();

application.use(express.json());
application.use(express.urlencoded({ extended: true}));
application.use(cookieParser());

const port = process.env.PORT || 5050;
const MONGOURL = process.env.MONGO_URL;


const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");

//handling routes
application.use("/", routes);

application.use(notFound);
application.use(errorHandler);

async function connectWithRetry() {
    try {
       
        //connecting to mongodb database
     const databaseConnected =  await mongoose.connect(MONGOURL);

     //verify the database is connected
     if(databaseConnected){
        application.listen(port, () => {
            console.log(`database has been connected and server is running on port ${port}`);
        });
     } else {
        console.log("Database connection failed");
        setInterval(connectWithRetry, 5000);
     }
    } catch (error) {
        console.log(`Database connection error: ${error}`);
        setInterval(connectWithRetry, 5000);
    }
}

connectWithRetry();