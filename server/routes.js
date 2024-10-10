'use strict'

//import dependences
const express = require('express');
const router = express.Router();
const { mongoose} = require('mongoose');


router.get('/', async(request, response) => {
    try {

    response.status(200).json("Welcome to home page");
        
    } catch (err) {
        console.log(err);
        response.status(500).json({
            message: "Error occured!!",
            error: err.message,
        })
    }
})






module.exports = router;
