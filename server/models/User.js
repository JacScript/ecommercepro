const { Schema, model } = require('mongoose');
const bcrypt = require("bcrypt");


// Define the User schema
const schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true // Ensures each username is unique
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensures each email is unique
    },
    password: {
        type: String,
        required: true // Password is required
    },
    isAdmin: {
        type: Boolean, // Use 'Boolean' with a capital 'B' for the type
        default: false // Defaults to false for non-admin users
    }
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

// Match user entered password to hashed password in database
schema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

// Encrypt password using bcrypt
schema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  


// Optional: Indexing for better performance on createdAt and updatedAt fields
schema.index({ createdAt: -1 }, { background: true });
schema.index({ updatedAt: -1 }, { background: true });

// Create the User model from the schema
const User = model('User', schema);

// Export the User model for use in other parts of the application
module.exports = User;
