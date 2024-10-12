const User = require('../models/User');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const { mongoose } = require("mongoose");


const router = require('express').Router();

// @desc    Update user profile
//route    PUT /user/:id
//@access   private
router.put('/:id', verifyTokenAndAuthorization, async (request, response) => {
    const userId = request.params.id;
  
    try {

          //Validate userId format:
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return response.status(400).json({ message: "Invalid userId" });
      }
      // Find the user by ID
      const user = await User.findById(userId);
  
      if (user) {
        // Update username and email only if provided in the request body
        user.username = request.body.username || user.username;
        user.email = request.body.email || user.email;
  
        // If a new password is provided, hash it before saving
        // if (request.body.password) {
        //   const salt = await bcrypt.genSalt(10);
        //   user.password = await bcrypt.hash(request.body.password, salt);
        // }
  
        // Save the updated user
        const updatedUser = await user.save();

         // Remove the password field from the response
        const { password: _, ...others } = updatedUser.toObject();
  
        // Return the updated user data (without the password)
        response.status(200).json({ others
          //_id: updatedUser._id,
         // username: updatedUser.username,
         // email: updatedUser.email,
        });
      } else {
        // If user not found, return a 404 response
        response.status(404).json({ message: "User not found!" });
      }
    } catch (err) {
      console.error(err);
      // Handle server error
      response.status(500).json({ message: "Server error. Please try again." });
    }
  });
 

  // @desc    Delete user 
//route     DELETE /user/:id
//@access   private
  router.delete('/:id', verifyTokenAndAuthorization, async (request, response) => {
    const userId = request.params.id;
  
    try {
      // Validate userId format
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return response.status(400).json({ message: "Invalid userId" });
      }
  
      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
        return response.status(404).json({ message: "User not found!" });
      }
  
      // Delete the user
      await User.findByIdAndDelete(userId);
  
      // Send success response
      response.status(200).json({ message: "User has been deleted" });
    } catch (err) {
      console.error(err);
      // Handle server error
      response.status(500).json({ message: "Server error. Please try again." });
    }
  });

   // @desc    get user 
//route     GET /user/find/:id
//@access   private
router.get('/find/:id', verifyTokenAndAdmin, async (request, response) => {
    const userId = request.params.id;
  
    try {
      // Validate userId format
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return response.status(400).json({ message: "Invalid userId" });
      }
  
      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
        return response.status(404).json({ message: "User not found!" });
      }
  
 
        // Remove the password field from the response
        const { password: _, ...others } = user.toObject();
  
      // Send success response
      response.status(200).json(others);
    } catch (err) {
      console.error(err);
      // Handle server error
      response.status(500).json({ message: "Server error. Please try again." });
    }
  });

     // @desc    get users 
//route     GET /user/find/:id
//@access   private
router.get('/', verifyTokenAndAdmin, async (request, response) => {
    const query = request.query.new;

    try {  
       // Find users and exclude the password field
    const users = query
      ? await User.find().select('-password').sort({ _id: -1 }).limit(5)
      : await User.find().select("-password");

  
      // Send success response
      response.status(200).json(users);
    } catch (err) {
      console.error(err);
      // Handle server error
      response.status(500).json({ message: "Server error. Please try again." });
    }
  });

     // @desc    get user stats
//route     GET /user/stats
//@access   private
router.get("/stats", verifyTokenAndAdmin, async (request, response) => {
  const date = new Date();  // Get the current date
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));  // Calculate the date for one year ago from today

  try {
    const data = await User.aggregate([
      { 
        $match: { createdAt: { $gte: lastYear }}  // Match users created after or on 'lastYear' date
      },
      {
        $project: {
          month: { $month: "$createdAt" },  // Extract the month from 'createdAt' field for each user
        },
      },
      {
        $group: {
          _id: "$month",  // Group users by month
          total: { $sum: 1 },  // Count the number of users in each month
        },
      },
    ]);
    
    response.status(200).json(data);  // Send a successful response with the aggregated data in JSON format
  } catch (err) {
    response.status(500).json(err);  // Handle any errors by sending a 500 status with the error details
  }
});

module.exports = router