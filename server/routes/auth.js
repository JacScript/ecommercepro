const bcrypt = require("bcryptjs");
const router = require("express").Router();
const User = require("../models/User"); // Assuming User model is in this path

// REGISTER
router.post("/register", async (request, response) => {
  const { username, email, password } = request.body;

  try {
    // Check if the user already exists with the provided email
    const userExists = await User.findOne({ email });

    if (userExists) {
      return response.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving
    const hashpassword = await bcrypt.hash(password, 10);

    // Create the new user with the hashed password
    const user = await User.create({
      username,
      email,
      password: hashpassword, // Save the hashed password
    });

    // Remove the password field from the response
    const { password: _, ...userWithoutPassword } = user.toObject();

    // Send the created user without the password field
    response.status(201).json(userWithoutPassword);
  } catch (err) {
    console.error(err);
    response.status(500).json({ message: "Server error. Please try again." });
  }
});


// @desc    Auth user/set token
//route     /auth/login
//@access   Public
router.post(
    "/auth/login",async (request, response) => {
      const { email, password } = request.body;
  
      const user = await User.findOne({ email });
  
      if (user && (await user.matchPassword(password))) {
        await generateToken(response, user._id);
  
        response.status(200).json({
          id: user._id,
          username: user.username,
          email: user.email,
          // token: token
        });
      } else {
        response.status(401);
        throw new Error("Invalid email or password");
      }
    })
  ;

module.exports = router;
