// Removed unnecessary import of 'type'
const { Schema, model } = require("mongoose");

// Define the Order schema
const schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId, // References the user who owns the order
      ref: "User", // Refers to the "User" model
      required: true, // The order must belong to a user
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId, // Each product is an ObjectId
          ref: "Product", // Refers to the "Product" model
          required: true, // Ensures each product in the order is valid
        },
        quantity: {
          type: Number, // Number of this specific product in the order
          default: 1, // Default quantity is 1 if not specified
        },
        amount: {
          type: Number, // Amount for the specific product (e.g., price * quantity)
          required: true, // Total cost for this product is required
        }
      },
    ],
    address: {
      type: Object, // The shipping address for the order
      required: true, // Address is required
    },
    status: {
      type: String, // Status of the order
      default: "pending", // Default status is "pending"
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Optional: Indexing for better performance on createdAt and updatedAt fields
schema.index({ createdAt: -1 }, { background: true });
schema.index({ updatedAt: -1 }, { background: true });

// Create the Order model from the schema
const Order = model("Order", schema);

// Export the Order model for use in other parts of the application
module.exports = Order;
