const { Schema, model } = require("mongoose");

// Define the Cart schema
const schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId, // References the user who owns the cart
      ref: "User", // Refers to the "User" model
      required: true, // The cart must belong to a user
    },
    product: [
      {
        productId: {
          type: Schema.Types.ObjectId, // Each product is an ObjectId
          ref: "Product", // Refers to the "Product" model
          required: true, // Ensures each product in the cart is valid
        },
        quantity: {
          type: Number, // Number of this specific product in the cart
          default: 1, // Default quantity is 1 if not specified
        },
      },
    ],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Optional: Indexing for better performance on createdAt and updatedAt fields
schema.index({ createdAt: -1 }, { background: true });
schema.index({ updatedAt: -1 }, { background: true });

// Create the Cart model from the schema
const Cart = model("Cart", schema);

// Export the Cart model for use in other parts of the application
module.exports = Cart;
