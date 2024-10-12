const router = require('express').Router();
const Product = require('../models/Product.js');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const { mongoose } = require("mongoose");


// @desc    Create a new product
// @route   POST /product/
// @access  Private (Admin only)
router.post("/", verifyTokenAndAdmin, async (request, response) => {
    // Create a new product instance using the data sent in the request body
    const newProduct = new Product(request.body);

    try {
        // Save the product to the database
        const savedProduct = await newProduct.save();
        // Send a success response with the saved product
        response.status(200).json(savedProduct);
    } catch (err) {
        // If an error occurs, send a 500 status and the error details
        response.status(500).json(err);
    }
});


// @desc    Update an existing product
// @route   PUT /product/:id
// @access  Private (Admin only)
router.put("/:id", verifyTokenAndAdmin, async (request, response) => {
    try {
        // Extract the product ID from the request parameters
        const productId = request.params.id;

         // Validate userId format
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return response.status(400).json({ message: "Invalid userId" });
      }

        // Find the product by its ID and update it with the data from the request body
        const updatedProduct = await Product.findByIdAndUpdate(
            productId, 
            {
                $set: request.body,  // Use $set to update fields in the product
            },
            {
                new: true  // Return the updated product instead of the old one
            }
        );

        // If the product was found and updated, return the updated product in the response
        response.status(200).json(updatedProduct);
    } catch (err) {
        // If an error occurs, send a 500 status and the error details
        response.status(500).json(err);
    }
});


  // @desc    Delete product
//route     DELETE /product/:id
//@access   private (Admin Only)
router.delete('/:id', verifyTokenAndAdmin, async (request, response) => {
    const productId = request.params.id;

    try {
        // Validate productId format
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return response.status(400).json({ message: "Invalid product ID" }); // Fix: Corrected error message
        }

        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return response.status(404).json({ message: "Product not found!" });
        }

        // Delete the product
        await Product.findByIdAndDelete(productId);

        // Send success response
        response.status(200).json({ message: "Product has been deleted successfully" }); // Fix: More descriptive success message
    } catch (err) {
        console.error(err);
        // Handle server error
        response.status(500).json({ message: "Server error. Please try again." });
    }
});


// @desc    Get a product by ID
// @route   GET /product/:id
router.get('/find/:id', async (request, response) => {
    const productId = request.params.id;
  
    try {
        // Validate productId format
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return response.status(400).json({ message: "Invalid product ID" });
        }

        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return response.status(404).json({ message: "Product not found!" });
        }

        // Send the found product as a response
        response.status(200).json(product);
    } catch (err) {
        console.error(err);
        // Handle server error
        response.status(500).json({ message: "Server error. Please try again." });
    }
});

// @desc    Get products, optionally filtering by "new" or "category"
// @route   GET /product/
// @access  Public
router.get('/', async (request, response) => {
    const qNew = request.query.new;  // Query parameter to filter by new products
    const qCategory = request.query.category;  // Query parameter to filter by product category

    try {  
        let products;

        // If "new" is specified, sort products by creation date (newest first) and limit to 5 results
        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(5);
        } 
        // If a category is specified, filter products by category
        else if (qCategory) {
            products = await Product.find({
                categories: { $in: [qCategory] }  // Check if the category exists in the product's categories array
            });
        } 
        // If no filters are specified, return all products
        else {
            products = await Product.find();
        }

        // Send the retrieved products as the success response
        response.status(200).json(products);
    } catch (err) {
        console.error(err);
        // Handle server error and send an error response
        response.status(500).json({ message: "Server error. Please try again." });
    }
});





module.exports = router