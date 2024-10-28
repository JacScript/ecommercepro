const { Schema, model } = require('mongoose');
const bcrypt = require("bcrypt");

// Define the User schema
const schema = new Schema({
    username: {
        type: String,
        required: true,
       // unique: true // Ensures each username is unique
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
        type: Boolean, // Boolean type, capitalized
        default: false // Defaults to false for non-admin users
    },
    img: {
        type: String // Optional profile image URL
    },
    dateOfBirth: {
        type: Date // Changed to 'Date' type for consistency
    },
    address: {
        //street: { type: String },
        city: { type: String },
       country: { type: String },
       // zip: { type: String }
    },
    phoneNumber: {
        type: String,
       // match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'] // Validates phone number format
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'suspended'], // Allowed status values
        default: 'active' // Default status
    }
}, { timestamps: true }); // Manages createdAt and updatedAt fields

// Method to match entered password with the hashed password in database
schema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypts password before saving if it has been modified
schema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10); // Generates a salt for hashing
    this.password = await bcrypt.hash(this.password, salt); // Hashes password
});

// Optional: Indexes for performance optimization on createdAt and updatedAt fields
schema.index({ createdAt: -1 }, { background: true });
schema.index({ updatedAt: -1 }, { background: true });

// Create the User model from the schema
const User = model('User', schema);

// Export the User model for use in other parts of the application
module.exports = User;
























// const { Schema, model } = require('mongoose');
// const bcrypt = require("bcrypt");


// // Define the User schema
// const schema = new Schema({
//     username: {
//         type: String,
//         required: true,
//         unique: true // Ensures each username is unique
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true // Ensures each email is unique
//     },
//     password: {
//         type: String,
//         required: true // Password is required
//     },
//     isAdmin: {
//         type: Boolean, // Use 'Boolean' with a capital 'B' for the type
//         default: false // Defaults to false for non-admin users
//     },
//     img: {
//       type: String
//     },
//     dataOfBirth: {
//       type: Number
//     },

//     status: {
//       type: String,
//       enum: ['active', 'inactive', 'suspended'], // Possible status values
//       default: 'active' // Default status
//   },
// }, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

// // Match user entered password to hashed password in database
// schema.methods.matchPassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
//   };

// // Encrypt password using bcrypt
// schema.pre('save', async function (next) {
//     if (!this.isModified('password')) {
//       next();
//     }
  
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   });
  


// // Optional: Indexing for better performance on createdAt and updatedAt fields
// schema.index({ createdAt: -1 }, { background: true });
// schema.index({ updatedAt: -1 }, { background: true });

// // Create the User model from the schema
// const User = model('User', schema);

// // Export the User model for use in other parts of the application
// module.exports = User;
