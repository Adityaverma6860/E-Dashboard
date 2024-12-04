// const mongoose = require('mongoose');
// // Dusra Schema banayenge  
// const productSchema = new mongoose.Schema({
//     name: String,
//     price: String,
//     category: String,
//     userId: String,
//     comany:String
//   });
// module.exports = mongoose.model("Product", productSchema);  

// Update code 
const mongoose = require("mongoose");

// Define the schema only if it doesn't exist
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  company: String,
});

// Use `mongoose.models.Product` to prevent recompiling the model
module.exports = mongoose.models.Product || mongoose.model("Products", productSchema);
