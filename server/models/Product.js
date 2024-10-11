const { Schema, model } = require('mongoose');

// Define the Product schema
const schema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true // Ensures each product title is unique
    },
    desc: {
        type: String,
        required: true,
        unique: true // It's uncommon to have unique descriptions; remove if not needed
    },
    img: {
        type: String, // Typically a URL or image path as a string
        required: true
    },
    categories: {
        type: [String], // Changed to an array of strings to allow multiple categories
        required: true
    },
    size: {
        type: String, // Assuming size is a string (e.g., 'M', 'L', etc.)
        required: true
    },
    color: {
        type: String, // Assuming color is a string (e.g., 'red', 'blue', etc.)
        required: true
    },
    price: {
        type: Number, // Price should be a Number, not a String
        required: true
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Optional: Indexing for better performance on createdAt and updatedAt fields
schema.index({ createdAt: -1 }, { background: true });
schema.index({ updatedAt: -1 }, { background: true });

// Create the Product model from the schema
const Product = model('Product', schema); // Fixed the model name from 'User' to 'Product'

// Export the Product model for use in other parts of the application
module.exports = Product;