const router = require('express').Router();
const Order = require("../models/Order.js");
const { verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization } = require('./verifyToken.js');

// @desc    Create a new order
// @route   POST /order/
// @access  Authenticated users (verified by verifyToken middleware)
router.post("/", verifyToken, async (request, response) => {
    try {
        // Validate request body (optional, based on your schema)
        if (!request.body || !request.body.user || !request.body.amount) {
            return response.status(400).json({ message: "Invalid order data. Please provide all required fields." });
        }

        // Create a new order instance using the data sent in the request body
        const newOrder = new Order(request.body);

        // Save the order to the database
        const savedOrder = await newOrder.save();

        // Send a success response with the saved order
        response.status(201).json(savedOrder);  // Use 201 status for "Created"
    } catch (err) {
        console.error(err);  // Log the error for debugging

        // Send a 500 status with a user-friendly error message in case of a server error
        response.status(500).json({ message: "Failed to create order. Please try again." });
    }
});


// @desc    Update an existing order 
// @route   PUT /order/:id
// @access  Admin only (verified by verifyTokenAndAdmin middleware)
router.put("/:id", verifyTokenAndAdmin, async (request, response) => {
    try {
        // Extract the order ID from the request parameters
        const orderId = request.params.id;

        // Validate the orderId format to ensure it's a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return response.status(400).json({ message: "Invalid order ID" });  // Return 400 for invalid ID
        }

        // Find the order by its ID and update it with the data from the request body
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,  // Fix: Corrected variable from `cartId` to `orderId`
            {
                $set: request.body,  // Use $set to update the specified fields
            },
            {
                new: true  // Return the updated order instead of the original
            }
        );

        // If the order was updated successfully, return the updated order
        if (!updatedOrder) {
            return response.status(404).json({ message: "Order not found" });  // Return 404 if order not found
        }

        response.status(200).json(updatedOrder);  // Return the updated order
    } catch (err) {
        //console.error(err);  // Log the error for debugging

        // Send a 500 status with a user-friendly error message in case of server error
        response.status(500).json({ message: "Failed to update order. Please try again." });  // Fix: Corrected error message from "cart" to "order"
    }
});


// @desc    Delete a order
// @route   DELETE /order/:id
// @access  Authorized users (verified by verifyTokenAndAdmin middleware)
router.delete('/:id', verifyTokenAndAdmin, async (request, response) => {
    // Extract the order ID from the request parameters
    const orderId = request.params.id;

    try {
        // Validate orderId format to ensure it's a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return response.status(400).json({ message: "Invalid order ID" });  // Return 400 if ID is invalid
        }

        // Check if the order exists by its ID
        const order = await Order.findById(orderId);
        if (!order) {
            return response.status(404).json({ message: "Order not found!" });  // Return 404 if no order is found
        }

        // Delete the order if it exists
        await Order.findByIdAndDelete(orderId);

        // Send a success response
        response.status(200).json({ message: "Order has been deleted successfully" });  // Return success message
    } catch (err) {
       // console.error(err);  // Log the error for debugging purposes

        // Handle server error by returning a 500 status with an error message
        response.status(500).json({ message: "Server error. Please try again." });
    }
});

// @desc    Get a orders by user ID
// @route   GET /order/find/:userId
// @access  Authorized users (verified by verifyTokenAndAuthorization middleware)
router.get('/find/:userId',verifyTokenAndAuthorization, async (request, response) => {
    // Extract orderId from the request parameters
    const orderId = request.params.userId;

    try {
        // Validate orderId format to make sure it's a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return response.status(400).json({ message: "Invalid order ID" }); // Return 400 status for invalid ID
        }

        // Find the order associated with the given userId
        const orders = await Order.findOne({ userId: userId });

        // If no order are found, return a 404 error
        if (!orders) {
            return response.status(404).json({ message: "Orders not found!" });
        }

        // Send the found order as a response with a 200 status
        response.status(200).json(orders);
    } catch (err) {
       // console.error(err);  // Log the error for debugging purposes

        // If there is a server error, return a 500 status with a user-friendly message
        response.status(500).json({ message: "Server error. Please try again." });
    }
});


// @desc    Get all orders
// @route   GET /order/
// @access  Admin only (verified by verifyTokenAndAdmin middleware)
router.get("/", verifyTokenAndAdmin, async (request, response) => {
    try {
        // Fetch all orders from the database
        const orders = await Order.find();

        // Return the fetched orders as a JSON response
        response.status(200).json(orders);
    } catch (err) {
       // console.error(err);  // Log the error for debugging

        // Return a 500 status in case of server error with an error message
        response.status(500).json({ message: "Server error. Please try again." });
    }
});

// @desc    Get income statistics
// @route   GET /order/income
// @access  Admin only (verified by verifyTokenAndAdmin middleware)
router.get("/income", verifyTokenAndAdmin, async (request, response) => {
    // Get the current date
    const date = new Date();
    
    // Calculate last month's date by subtracting 1 month from the current date
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    
    // Calculate the previous month by subtracting 1 more month from lastMonth
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        // Use MongoDB aggregation to calculate income stats
        const income = await Order.aggregate([
            // Stage 1: Match orders created after the previous month
            { $match: { createdAt: { $gte: previousMonth } } },
            
            // Stage 2: Project (extract) the month and the sales amount for each order
            {
                $project: {
                    month: { $month: "$createdAt" },  // Extract the month from the createdAt date
                    sales: "$amount",  // Use the "amount" field as the sales data
                }
            },

            // Stage 3: Group the data by month and calculate the total sales for each month
            {
                $group: {
                    _id: "$month",  // Group by the month extracted earlier
                    total: { $sum: "$sales" }  // Sum up the sales amounts for each month
                }
            }
        ]);

        // Send the calculated income statistics as a response
        response.status(200).json(income);
    } catch (err) {
        console.error(err);  // Log the error for debugging purposes
        
        // Return a 500 status with an error message in case of a server issue
        response.status(500).json({ message: "Server error. Please try again." });
    }
});


module.exports = router