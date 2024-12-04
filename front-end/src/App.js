
import './App.css';
import Nav from './Component/Nav';
import Footer from './Component/Footer';
import SignUp from './Component/SignUp';
import Login from './Component/Login';
import Product from './Component/Product';
import ProductList from './Component/ProductList';
import UpdateProduct from './Component/UpdateProduct';
import PrivateComponent from './Component/PrivateComponent';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* Navigation Bar */}
        <Nav />

        {/* Application Routes */}
        <Routes>
          {/* Private Routes */}
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<ProductList />} />
            <Route path="/product" element={<Product />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
            <Route path="/logout" element={<h1>Logout Component</h1>} />
            <Route path="/profile" element={<h1>Profile Component</h1>} />
          </Route>

          {/* Public Routes */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
