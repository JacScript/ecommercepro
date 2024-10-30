const router = require("express").Router();
const User = require("../models/User"); // Assuming User model is in this path
const jwt = require('jsonwebtoken')


// REGISTER
router.post("/register", async (request, response) => {
  const { username, email, password, img, phoneNumber, dateOfBirth, city, country } = request.body;

  try {
    // Check if the user already exists with the provided email
    const userExists = await User.findOne({ email });

    if (userExists) {
      return response.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving
    // const hashpassword = await bcrypt.hash(password, 10);

    // Create the new user with the hashed password
    const user = await User.create({
      username,
      email,
      img,
      phoneNumber,
      dateOfBirth,
      password ,
      address: { city, country }
    });


    const accessToken = await jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "30d" }
    );

    // Remove the password field from the response
    const { password: _, ...others } = user.toObject();

    // Send the created user without the password field
    response.status(201).json({...others, accessToken});
  } catch (err) {
    console.error(err);
    response.status(500).json({ message: "Server error. Please try again." });
  }
});


// @desc    Auth user/set token
//route     /auth/login
//@access   Public
router.post("/login", async (request, response) => {
    const { email, password } = request.body;
  
    try {
      // Find user by email
      const user = await User.findOne({ email });
  
      // Check if user exists and password matches
      if (user && (await user.matchPassword(password))) {
        // Remove the password field from the response
        const { password: _, ...others } = user.toObject();

        const accessToken = await jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
          },
          process.env.JWT_SEC,
          { expiresIn: "30d" }
        );
  
        // Respond with user details (excluding password)
        response.status(200).json({...others, accessToken});
      } else {
        // Invalid email or password
        response.status(401).json({ message: "Invalid email or password" });
      }
    } catch (err) {
      console.error(err);
      response.status(500).json({ message: "Server error. Please try again." });
    }
  });
  

module.exports = router;
