
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Redirect to home if already logged in
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate("/");
        }
    }, [navigate]);

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Please fill out all fields.");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();

            if (response.ok && result.name) {
                localStorage.setItem("user", JSON.stringify(result));
                navigate("/");
            } else {
                setError(result.message || "Invalid email or password.");
            }
        } catch (err) {
            setError("An error occurred while logging in.");
        }
    };

    return (
        <div className="login">
            <h1>Login</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input
                type="text"
                className="inputBox"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <input
                className="inputBox"
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button onClick={handleLogin} className="appButton" type="button">
                Login
            </button>
        </div>
    );
};

export default Login;

// after JWT 

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     // Redirect to home if already logged in
//     useEffect(() => {
//         const auth = localStorage.getItem('user');
//         if (auth) {
//             navigate("/");
//         }
//     }, [navigate]);

//     const handleLogin = async () => {
//         if (!email || !password) {
//             setError("Please enter both email and password.");
//             return;
//         }
        
//         setError(''); // Reset error message before API call

//         try {
//             let result = await fetch('http://localhost:5000/login', {
//                 method: 'POST',
//                 body: JSON.stringify({ email, password }),
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });

//             result = await result.json();

//             if (result.auth) {
//                 localStorage.setItem("user", JSON.stringify(result.user));
//                 localStorage.setItem("token", JSON.stringify(result.auth));

//                 navigate("/"); // Redirect to home on successful login
//             } else {
//                 setError("Invalid login credentials. Please try again.");
//             }
//         } catch (error) {
//             console.error("Login error:", error);
//             setError("An error occurred. Please try again later.");
//         }
//     };

//     return (
//         <div className="login">
//             {error && <div className="error">{error}</div>} {/* Display error if any */}

//             <input
//                 type="text"
//                 className="inputBox"
//                 placeholder="Enter Email"
//                 onChange={(e) => setEmail(e.target.value)}
//                 value={email}
//             />
//             <input
//                 className="inputBox"
//                 type="password"
//                 placeholder="Enter Password"
//                 onChange={(e) => setPassword(e.target.value)}
//                 value={password}
//             />
//             <button onClick={handleLogin} className="appButton" type="button">
//                 Login
//             </button>
//         </div>
//     );
// };

// export default Login;
