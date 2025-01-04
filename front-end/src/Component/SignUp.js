
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Redirect to home if already logged in
    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate("/");
        }
    }, [navigate]);

    // Collect user data and register
    const collectData = async () => {
        if (!name || !email || !password) {
            setError("All fields are required");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/register", {
                method: "POST",
                body: JSON.stringify({ name, email, password }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = await response.json();

            if (response.ok) {
                localStorage.setItem("user", JSON.stringify(result));
                navigate("/");
            } else {
                setError(result.message || "Failed to register");
            }
        } catch (err) {
            setError("An error occurred while registering");
        }
    };

    return (
        <div>
            <h1>Register</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input
                className="inputBox"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
            />
            <input
                className="inputBox"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
            />
            <input
                className="inputBox"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
            />
            <button onClick={collectData} className="appButton" type="button">
                SignUp
            </button>
        </div>
    );
};

export default SignUp;

// // afte JWT 

// import React, { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';

// const SignUp = () => {
//     const [name, setName] = useState("");
//     const [password, setPassword] = useState("");
//     const [email, setEmail] = useState("");
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     // Redirect to home if already logged in
//     useEffect(() => {
//         const auth = localStorage.getItem('user');
//         if (auth) {
//             navigate('/');
//         }
//     }, [navigate]);

//     const collectData = async () => {
//         if (!name || !email || !password) {
//             setError("All fields are required.");
//             return;
//         }
//         setError(""); // Reset error message
//         try {
//             let result = await fetch('http://localhost:5000/register', {
//                 method: 'POST',
//                 body: JSON.stringify({ name, email, password }),
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });
//             result = await result.json();

//             if (result.auth) {
//                 localStorage.setItem("user", JSON.stringify(result.user));
//                 localStorage.setItem("token", JSON.stringify(result.auth));
//                 navigate('/'); // Navigate to home page on successful registration
//             } else {
//                 setError("Signup failed. Please try again.");
//             }
//         } catch (error) {
//             console.error("Error during signup:", error);
//             setError("An error occurred. Please try again later.");
//         }
//     };

//     return (
//         <div>
//             <h1>Register</h1>
//             {error && <div className="error">{error}</div>} {/* Display error messages */}
//             <input
//                 className="inputBox"
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Enter Name"
//             />
//             <input
//                 className="inputBox"
//                 type="text"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter Email"
//             />
//             <input
//                 className="inputBox"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter Password"
//             />
//             <button onClick={collectData} className="appButton" type="button">
//                 Sign Up
//             </button>
//         </div>
//     );
// };

// export default SignUp;

