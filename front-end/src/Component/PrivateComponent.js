// video-12 
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateComponent = () => {
    const auth = localStorage.getItem('user');
    // agar kuch data (outlet)nhi hai to navigate hoga singup wale page pe   
    return auth ? <Outlet /> : <Navigate to="/signup" />;
};

export default PrivateComponent;

