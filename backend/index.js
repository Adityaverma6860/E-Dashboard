

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");


const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for cross-origin requests

// Routes

// Registration API ( Post Api for register integrating in SingUp file )
app.post("/register", async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password; // Remove password from the response
   resp.send(result); 
});

// Login API ( Post Api for login integrating in Login file)
app.post("/login", async (req, resp) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      resp.send(user);
    } else {
      resp.send({ error: "No User Found" });
    }
  } else {
    resp.send({ error: "Invalid Credentials" });
  }
});

// Add Product API (Post Api for Product integrating in Product file )
app.post("/add-product", async (req, resp) => {
  let product = new Product(req.body);
  let result = await product.save();
  resp.send(result);
});

// Get All Products API ( Get Api for Data get from Db integrating in Product list )
app.get("/products", async (req, resp) => {
  let products = await Product.find();
  if (products.length > 0) {
    resp.send(products);
  } else {
    resp.send({ result: "No Products Found" });
  }
});

// Delete Product API (  Api for delete product integrating in Product List)
app.delete("/product/:id", async (req, resp) => {
  let result = await Product.deleteOne({ _id: req.params.id });
  if (result.deletedCount > 0) {
    resp.send({ success: "Product Deleted" });
  } else {
    resp.send({ error: "No Record Found" });
  }
});

// Get Single Product API (Api for Single Product  Get  integrating in Update Component File)
app.get("/product/:id", async (req, resp) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No Record Found" });
  }
});

// Update Product API ( Api for update product integrating in Update Component )
app.put("/product/:id", async (req, resp) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body } // Fixed typo: `req.bpdy` to `req.body`
  );
  if (result.modifiedCount > 0) {
    resp.send({ success: "Product Updated" });
  } else {
    resp.send({ error: "Update Failed or No Changes Made" });
  }
});

// Search Products API (Api for Search Product Data integrating in )
app.get("/search/:key", async (req, resp) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key, $options: "i" } }, // Case-insensitive search
      { category: { $regex: req.params.key, $options: "i" } },
      { company: { $regex: req.params.key, $options: "i" } },
    ],
  });
  resp.send(result);
});
// Start the Express server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});


//  // After JWT 
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const jwt = require('jsonwebtoken');
// const User = require("./db/User");
// const Product = require("./db/Product");
// require("./db/config");

// const app = express();
// const jwtKey = 'merndb';

// // Middleware
// app.use(express.json());
// app.use(cors());

// // API Routes

// // Register API
// app.post("/register", async (req, resp) => {
//     try {
//         let user = new User(req.body);
//         let result = await user.save();
//         result = result.toObject();
//         delete result.password;

//         jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
//             if (err) {
//                 return resp.send({ result: "Something went wrong, please try again later." });
//             }
//             resp.send({ result, auth: token });
//         });
//     } catch (error) {
//         resp.status(500).send({ result: "Error while registering user." });
//     }
// });

// // Login API
// app.post("/login", async (req, resp) => {
//     try {
//         if (req.body.password && req.body.email) {
//             let user = await User.findOne(req.body).select("-password");
//             if (user) {
//                 jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
//                     if (err) {
//                         return resp.send({ result: "Something went wrong, please try again later." });
//                     }
//                     resp.send({ user, auth: token });
//                 });
//             } else {
//                 resp.send({ result: "No user found." });
//             }
//         } else {
//             resp.status(400).send({ result: "Invalid email or password." });
//         }
//     } catch (error) {
//         resp.status(500).send({ result: "Error during login." });
//     }
// });

// // Add Product API
// app.post("/add-product", async (req, resp) => {
//     try {
//         let product = new Product(req.body);
//         let result = await product.save();
//         resp.send(result);
//     } catch (error) {
//         resp.status(500).send({ result: "Error while adding product." });
//     }
// });

// // Get All Products API
// app.get("/products", VerifyToken, async (req, resp) => {
//     try {
//         let products = await Product.find();
//         if (products.length > 0) {
//             resp.send(products);
//         } else {
//             resp.send({ result: "No products found." });
//         }
//     } catch (error) {
//         resp.status(500).send({ result: "Error while fetching products." });
//     }
// });

// // Delete Product API
// app.delete("/product/:id", VerifyToken, async (req, resp) => {
//     try {
//         const result = await Product.deleteOne({ _id: req.params.id });
//         resp.send(result);
//     } catch (error) {
//         resp.status(500).send({ result: "Error while deleting product." });
//     }
// });

// // Get Single Product API
// app.get("/product/:id", VerifyToken, async (req, resp) => {
//     try {
//         let result = await Product.findOne({ _id: req.params.id });
//         if (result) {
//             resp.send(result);
//         } else {
//             resp.send({ result: "No record found." });
//         }
//     } catch (error) {
//         resp.status(500).send({ result: "Error while fetching product details." });
//     }
// });

// // Update Product API
// app.put("/product/:id", VerifyToken, async (req, resp) => {
//     try {
//         let result = await Product.updateOne(
//             { _id: req.params.id },
//             { $set: req.body }
//         );
//         resp.send(result);
//     } catch (error) {
//         resp.status(500).send({ result: "Error while updating product." });
//     }
// });

// // Search Product API
// app.get("/search/:key", VerifyToken, async (req, resp) => {
//     try {
//         let result = await Product.find({
//             "$or": [
//                 { name: { $regex: req.params.key, $options: "i" } },
//                 { category: { $regex: req.params.key, $options: "i" } },
//                 { company: { $regex: req.params.key, $options: "i" } }
//             ]
//         });
//         resp.send(result);
//     } catch (error) {
//         resp.status(500).send({ result: "Error while searching products." });
//     }
// });

// // JWT Token Verification Middleware
// function VerifyToken(req, resp, next) {
//     let token = req.headers['authorization'];
//     if (token) {
//         token = token.split(' ')[1];
//         jwt.verify(token, jwtKey, (err, valid) => {
//             if (err) {
//                 resp.status(401).send({ result: "Please provide a valid token." });
//             } else {
//                 next();
//             }
//         });
//     } else {
//         resp.status(403).send({ result: "Please include a token in the header." });
//     }
// }

// // Start the Express server
// app.listen(5000, () => {
//     console.log("Server is running on port 5000");
// });
