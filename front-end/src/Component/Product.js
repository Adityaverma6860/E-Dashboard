
import React, { useState } from 'react';

const Product = () => {
  // Input states for product details
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState(false);

  // Function to handle adding a product
  const addProduct = async () => {
    // Validation for input fields
    if (!name || !price || !category || !company) {
      setError(true);
      return;
    }

    // Get user ID from localStorage
    const userId = JSON.parse(localStorage.getItem('user'))._id;

    // API call to add the product
    let result = await fetch("http://localhost:5000/add-product", {
      method: 'POST',
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    result = await result.json(); // Parse response JSON
    console.warn(result);
  };

  return (
    <div className="product">
      <h1>Add Product</h1>
      <input
        type="text"
        placeholder="Enter product name"
        className="inputBox"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {error && !name && <span className="invalid-input">Enter valid name</span>}

      <input
        type="text"
        placeholder="Enter product price"
        className="inputBox"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      {error && !price && <span className="invalid-input">Enter valid price</span>}

      <input
        type="text"
        placeholder="Enter product category"
        className="inputBox"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      {error && !category && <span className="invalid-input">Enter valid category</span>}

      <input
        type="text"
        placeholder="Enter product company"
        className="inputBox"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      {error && !company && <span className="invalid-input">Enter valid company</span>}

      <button onClick={addProduct} className="appButton">Add Product</button>
    </div>
  );
};

export default Product;

// after jwt 

// import React, { useState } from 'react';

// const Product = () => {
//     // State variables for input fields
//     const [name, setName] = useState('');
//     const [price, setPrice] = useState('');
//     const [category, setCategory] = useState('');
//     const [company, setCompany] = useState('');
//     const [error, setError] = useState(false);

//     // Function to handle product submission
//     const addProduct = async () => {
//         console.log(name, price, category, company);

//         // Fetch user ID from localStorage
//         const userId = JSON.parse(localStorage.getItem('user'))._id;

//         // Input validation
//         if (!name || !price || !category || !company) {
//             setError(true);
//             return false;
//         }

//         // API call to add a product
//         let result = await fetch("http://localhost:5000/add-product", {
//             method: 'POST',
//             body: JSON.stringify({ name, price, category, company, userId }),
//             headers: {
//                 "Content-Type": "application/json",
//                 authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
//             }
//         });

//         result = await result.json();
//         console.log(result);

//         // Optionally clear the form after successful submission
//         if (result) {
//             setName('');
//             setPrice('');
//             setCategory('');
//             setCompany('');
//             setError(false);
//             alert("Product added successfully!");
//         }
//     };

//     return (
//         <div className='product'>
//             <h1>Add Product</h1>
//             <input 
//                 type="text" 
//                 placeholder='Enter product name' 
//                 className='inputBox'
//                 value={name} 
//                 onChange={(e) => setName(e.target.value)} 
//             />
//             {error && !name && <span className='invalid-input'>Enter a valid name</span>}

//             <input 
//                 type="text" 
//                 placeholder='Enter product price' 
//                 className='inputBox'
//                 value={price} 
//                 onChange={(e) => setPrice(e.target.value)} 
//             />
//             {error && !price && <span className='invalid-input'>Enter a valid price</span>}

//             <input 
//                 type="text" 
//                 placeholder='Enter product category' 
//                 className='inputBox'
//                 value={category} 
//                 onChange={(e) => setCategory(e.target.value)} 
//             />
//             {error && !category && <span className='invalid-input'>Enter a valid category</span>}

//             <input 
//                 type="text" 
//                 placeholder='Enter product company' 
//                 className='inputBox'
//                 value={company} 
//                 onChange={(e) => setCompany(e.target.value)} 
//             />
//             {error && !company && <span className='invalid-input'>Enter a valid company</span>}

//             <button onClick={addProduct} className='appButton'>Add Product</button>
//         </div>
//     );
// };

// export default Product;
