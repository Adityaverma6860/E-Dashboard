
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  // Fetch product details for the given ID
  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`);
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  // Update product details
  const updateProduct = async () => {
    if (!name || !price || !category || !company) {
      alert("Please fill all the fields");
      return;
    }

    const updatedProduct = { name, price, category, company };
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedProduct),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    result = await result.json();
    console.warn(result);
    navigate('/'); // Navigate to product list page after successful update
  };

  return (
    <div className="product">
      <h1>Update Product</h1>
      <input
        type="text"
        placeholder="Enter product name"
        className="inputBox"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter product price"
        className="inputBox"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter product category"
        className="inputBox"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter product company"
        className="inputBox"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <button onClick={updateProduct} className="appButton">Update Product</button>
    </div>
  );
};

export default UpdateProduct;

// after jwt

// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// const UpdateProduct = () => {
//     // State variables for product details
//     const [name, setName] = useState('');
//     const [price, setPrice] = useState('');
//     const [category, setCategory] = useState('');
//     const [company, setCompany] = useState('');
//     const params = useParams();
//     const navigate = useNavigate();

//     // Fetch product details when the component mounts
//     useEffect(() => {
//         getProductDetails();
//     }, []);

//     // API call to fetch product details by ID
//     const getProductDetails = async () => {
//         try {
//             let result = await fetch(`http://localhost:5000/product/${params.id}`, {
//                 headers: {
//                     authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
//                 },
//             });
//             result = await result.json();
//             if (result) {
//                 setName(result.name);
//                 setPrice(result.price);
//                 setCategory(result.category);
//                 setCompany(result.company);
//             }
//         } catch (error) {
//             console.error("Error fetching product details:", error);
//         }
//     };

//     // API call to update the product
//     const updateProduct = async () => {
//         if (!name || !price || !category || !company) {
//             alert("All fields are required.");
//             return;
//         }
//         try {
//             let result = await fetch(`http://localhost:5000/product/${params.id}`, {
//                 method: 'PUT', // Corrected method to PUT
//                 body: JSON.stringify({ name, price, category, company }),
//                 headers: {
//                     'Content-Type': "application/json",
//                     authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
//                 },
//             });
//             result = await result.json();
//             if (result) {
//                 navigate('/'); // Navigate to the home page after successful update
//             } else {
//                 alert("Failed to update the product.");
//             }
//         } catch (error) {
//             console.error("Error updating product:", error);
//         }
//     };

//     return (
//         <div className="product">
//             <h1>Update Product</h1>
//             <input
//                 type="text"
//                 placeholder="Enter product name"
//                 className="inputBox"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//             />
//             <input
//                 type="text"
//                 placeholder="Enter product price"
//                 className="inputBox"
//                 value={price}
//                 onChange={(e) => setPrice(e.target.value)}
//             />
//             <input
//                 type="text"
//                 placeholder="Enter product category"
//                 className="inputBox"
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//             />
//             <input
//                 type="text"
//                 placeholder="Enter product company"
//                 className="inputBox"
//                 value={company}
//                 onChange={(e) => setCompany(e.target.value)}
//             />
//             <button onClick={updateProduct} className="appButton">
//                 Update Product
//             </button>
//         </div>
//     );
// };

// export default UpdateProduct;

