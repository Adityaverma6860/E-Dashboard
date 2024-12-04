
import React, { useEffect, useState } from "react";
// import Footer from "./Footer";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  // Fetch product list
  const getProducts = async () => {
    let result = await fetch('http://localhost:5000/products')
     
    result = await result.json();
    setProducts(result);
  };

  // Delete a product
  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "DELETE",
    });
    result = await result.json();
    if (result) {
      getProducts(); // Refresh product list
    }
  };
 
  // Search for products
  const searchHandle = async (event) => {
    let key = event.target.value;
    if (!key) {
      getProducts(); // Reset to full list if search is cleared
      return;
    }

    let result = await fetch(`http://localhost:5000/search/${key}`);
    result = await result.json();
    if (result) {
      setProducts(result);
    }
  };

  return (
    <div className="product-list">
      <h3>Product List</h3>
      <input
        type="text"
        className="search-product-box"
        placeholder="Search Product"
        onChange={searchHandle}
      />
      <ul>
        <li>S.No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Operation</li>
      </ul>
      {
        products.length > 0 ? products.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>{item.price}</li>
            <li>{item.category}</li>
            <li>
              <button onClick={() => deleteProduct(item._id)}>Delete</button>
              <Link to={`/update/${item._id}`}>Update</Link>
            </li>
          </ul>
        )) : <h1>No Results Found</h1>
      }
    </div>
  );
};

export default ProductList;

// afte Jwt

// import React, { useEffect, useState } from "react";
// import Footer from "./Footer";
// import { Link } from "react-router-dom";

// const ProductList = () => {
//     const [products, setProducts] = useState([]);

//     // Fetch the product list on component mount
//     useEffect(() => {
//         getProducts();
//     }, []);

//     const getProducts = async () => {
//         try {
//             let result = await fetch('http://localhost:5000/products', {
//                 headers: {
//                     authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
//                 },
//             });
//             result = await result.json();
//             setProducts(result);
//         } catch (error) {
//             console.error("Error fetching products:", error);
//         }
//     };

//     // Delete a product by ID
//     const deleteProduct = async (id) => {
//         try {
//             let result = await fetch(`http://localhost:5000/products/${id}`, {
//                 method: "DELETE",
//                 headers: {
//                     authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
//                 },
//             });

//             result = await result.json();
//             if (result) {
//                 getProducts(); // Refresh product list
//             }
//         } catch (error) {
//             console.error("Error deleting product:", error);
//         }
//     };

//     // Search for products
//     const searchHandle = async (event) => {
//         let key = event.target.value;
//         if (key) {
//             try {
//                 let result = await fetch(`http://localhost:5000/search/${key}`, {
//                     headers: {
//                         authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
//                     },
//                 });
//                 result = await result.json();
//                 setProducts(result);
//             } catch (error) {
//                 console.error("Error searching products:", error);
//             }
//         } else {
//             getProducts(); // Reload all products if search input is cleared
//         }
//     };

//     return (
//         <div className="product-list">
//             <h3>Product List</h3>
//             <input
//                 type="text"
//                 className="search-product-box"
//                 placeholder="Search Product"
//                 onChange={searchHandle}
//             />
//             <ul>
//                 <li>S.no</li>
//                 <li>Name</li>
//                 <li>Price</li>
//                 <li>Category</li>
//                 <li>Operation</li>
//             </ul>
//             {products.length > 0 ? (
//                 products.map((item, index) => (
//                     <ul key={item._id}>
//                         <li>{index + 1}</li>
//                         <li>{item.name}</li>
//                         <li>{item.price}</li>
//                         <li>{item.category}</li>
//                         <li>
//                             <button onClick={() => deleteProduct(item._id)}>Delete</button>
//                             <Link to={`/update/${item._id}`}>Update</Link>
//                         </li>
//                     </ul>
//                 ))
//             ) : (
//                 <h1>No Results Found</h1>
//             )}
//         </div>
//     );
// };

// export default ProductList;

