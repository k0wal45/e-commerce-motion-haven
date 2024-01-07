import { BrowserRouter as Router,  Routes, Route } from "react-router-dom"; 

import Home from "./pages/Home";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import Checkout from "./pages/Checkout";
import Product from "./pages/Product";
import Notfound from "./pages/Notfound";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCartItems } from "./cartSlice";


function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCartItems())
  }, [])

  const getCart = useSelector((state) => state.cart.value)


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/category/:catId" element={<Category/>}/>
        <Route path="/product/:prodId" element={<Product/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/notfound" element={<Notfound/>}/>
        <Route path="/*" element={<Notfound/>}/>
      </Routes>
      <Footer />
    </Router>
  )
}

export default App;
