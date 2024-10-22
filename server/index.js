'use strict'
const express = require('express');
const application = express();
const  dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
dotenv.config();
const cors = require("cors");
// const routes = require("./routes");
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");
const productRoutes = require("./routes/product.js");
const cartRoutes = require("./routes/cart.js");
const orderRoutes = require("./routes/order.js");
const stripeRoutes = require("./routes/stripe.js");


application.use(express.json());
application.use(express.urlencoded({ extended: true}));
application.use(cookieParser());

// // CORS configuration
application.use(
  cors({
    origin: ["http://localhost:3000"], // Change to your frontend's port
    credentials: true,
  })
);


const port = process.env.PORT || 5050;
const MONGOURL = process.env.MONGO_URL;


const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");

//handling routes
application.use("/auth", authRoutes);
application.use("/users", userRoutes);
application.use("/products", productRoutes);
application.use("/cart", cartRoutes);
application.use("/order", orderRoutes);
application.use("/checkout", stripeRoutes);

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