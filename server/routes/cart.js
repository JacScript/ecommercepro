const Cart = require('../models/Cart.js');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');

const router = require('express').Router();

// @desc    Create a new cart
// @route   POST /cart/
// @access  Authenticated users (verified by verifyToken middleware)
router.post("/", verifyToken, async (request, response) => {
    // Create a new cart instance using the data sent in the request body
    const newCart = new Cart(request.body);

    try {
        // Save the new cart to the database
        const savedCart = await newCart.save();

        // Send a success response with the saved cart details
        response.status(201).json(savedCart);  // 201 status code is for "Created"
    } catch (err) {
       // console.error(err); // Log the error for debugging

        // Send a 500 status with a user-friendly error message if something goes wrong
        response.status(500).json({ message: "Failed to create cart. Please try again." });
    }
});


// @desc    Update an existing cart
// @route   PUT /cart/:id
// @access  Authorized users (verified by verifyTokenAndAuthorization middleware)

router.put("/:id", verifyTokenAndAuthorization, async (request, response) => {
    try {
        // Extract the cart ID from the request parameters
        const cartId = request.params.id;

        // Validate the cartId format to ensure it's a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            return response.status(400).json({ message: "Invalid cart ID" });
        }

        // Find the cart by its ID and update it with the data from the request body
        const updatedCart = await Cart.findByIdAndUpdate(
            cartId,
            {
                $set: request.body,  // Use $set to update the specified fields
            },
            {
                new: true  // Return the updated cart instead of the original
            }
        );

        // If the cart was updated successfully, return the updated cart
        if (!updatedCart) {
            return response.status(404).json({ message: "Cart not found" });
        }

        response.status(200).json(updatedCart);  // Return the updated cart
    } catch (err) {

        // Send a 500 status with a user-friendly error message in case of server error
        response.status(500).json({ message: "Failed to update cart. Please try again." });
    }
});


// @desc    Delete a cart
// @route   DELETE /cart/:id
// @access  Authorized users (verified by verifyTokenAndAuthorization middleware)
router.delete('/:id', verifyTokenAndAuthorization, async (request, response) => {
    // Extract the cart ID from the request parameters
    const cartId = request.params.id;

    try {
        // Validate cartId format to ensure it's a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            return response.status(400).json({ message: "Invalid cart ID" });  // Return 400 if ID is invalid
        }

        // Check if the cart exists by its ID
        const cart = await Cart.findById(cartId);
        if (!cart) {
            return response.status(404).json({ message: "Cart not found!" });  // Return 404 if no cart is found
        }

        // Delete the cart if it exists
        await Cart.findByIdAndDelete(cartId);

        // Send a success response
        response.status(200).json({ message: "Cart has been deleted successfully" });  // Return success message
    } catch (err) {
       // console.error(err);  // Log the error for debugging purposes

        // Handle server error by returning a 500 status with an error message
        response.status(500).json({ message: "Server error. Please try again." });
    }
});


// @desc    Get a cart by user ID
// @route   GET /cart/find/:userId
// @access  Authorized users (verified by verifyTokenAndAuthorization middleware)
router.get('/find/:userId', verifyTokenAndAuthorization, async (request, response) => {
    // Extract userId from the request parameters
    const userId = request.params.userId;

    try {
        // Validate userId format to make sure it's a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return response.status(400).json({ message: "Invalid user ID" }); // Return 400 status for invalid ID
        }

        // Find the cart associated with the given userId
        const cart = await Cart.findOne({ userId: userId });

        // If no cart is found, return a 404 error
        if (!cart) {
            return response.status(404).json({ message: "Cart not found!" });
        }

        // Send the found cart as a response with a 200 status
        response.status(200).json(cart);
    } catch (err) {
       // console.error(err);  // Log the error for debugging purposes

        // If there is a server error, return a 500 status with a user-friendly message
        response.status(500).json({ message: "Server error. Please try again." });
    }
});


// @desc    Get all carts
// @route   GET /cart/
// @access  Admin only (verified by verifyTokenAndAdmin middleware)
router.get("/", verifyTokenAndAdmin, async (request, response) => {
    try {
        // Fetch all carts from the database
        const carts = await Cart.find();

        // Return the fetched carts as a JSON response
        response.status(200).json(carts);
    } catch (err) {
       // console.error(err);  // Log the error for debugging

        // Return a 500 status in case of server error with an error message
        response.status(500).json({ message: "Server error. Please try again." });
    }
});



module.exports = router