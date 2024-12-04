const mongoose = require('mongoose');
// Schema banayenge 
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
  });
module.exports = mongoose.model("users",userSchema);  
