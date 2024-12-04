

import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
    const auth = localStorage.getItem("user");
    const navigate = useNavigate();

    // Handle logout and clear user data
    const logout = () => {
        localStorage.clear();
        navigate("/signup");
    };

    return (
        
        <div>
            {/* Logo Section */}
            <img
                alt="logo"
                className="logo"
                src="https://www.vecteezy.com/vector-art/11999629-monitoring-icon-logo-vector-illustration-dashboard-admin-symbol-template-for-graphic-and-web-design-collection"
            />

            {auth ? (
                <ul className="nav-ul">
                    <li>
                        <Link to="/">Products</Link>
                    </li>
                    <li>
                        <Link to="/product">Add Products</Link>
                    </li>
                    <li>
                        <Link to="/update">Update Product</Link>
                    </li>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                        <Link onClick={logout} to="/signup">
                            Logout ({JSON.parse(auth).name})
                        </Link>
                    </li>
                </ul>
            ) : (
                <ul className="nav-ul nav-right">
                    <li>
                        <Link to="/signup">Sign Up</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default Nav;

 // After JWT 


// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Nav = () => {
//     const auth = localStorage.getItem("user");
//     const navigate = useNavigate();

//     // Handle logout and clear user data
//     const logout = () => {
//         localStorage.clear();
//         navigate("/signup");
//     };

//     return (
//         <div>
//             {/* Logo Section */}
//             <img
//                 alt="logo"
//                 className="logo"
//                 src="https://cdn.shopify.com/s/files/1/0934/6388/products/BK006_Ariana_1273f45a-3b82-4749-8fed-82aef146b632_grande.png?v=1510257365" />

//             {auth ? (
//                 <ul className="nav-ul">
//                     <li>
//                         <Link to="/">Products</Link>
//                     </li>
//                     <li>
//                         <Link to="/product">Add Products</Link>
//                     </li>
//                     <li>
//                         <Link to="/update">Update Product</Link>
//                     </li>
//                     <li>
//                         <Link to="/profile">Profile</Link>
//                     </li>
//                     <li>
//                         <Link onClick={logout} to="/signup">
//                             Logout ({JSON.parse(auth).name})
//                         </Link>
//                     </li>
//                 </ul>
//             ) : (
//                 <ul className="nav-ul nav-right">
//                     <li>
//                         <Link to="/signup">Sign Up</Link>
//                     </li>
//                     <li>
//                         <Link to="/login">Login</Link>
//                     </li>
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default Nav;


