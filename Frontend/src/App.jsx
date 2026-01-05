import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CartProvider } from "../src/context/CartContext.jsx";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import AddToCart from "./pages/cart";
import Checkout from "./pages/Checkout";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import DashboardProduct from "./pages/dashboard/Product.jsx";
import Order from "./pages/dashboard/Order.jsx"
import AddProduct from "./pages/dashboard/AddProduct.jsx";
import EditProductPage from "./pages/dashboard/EditProductPage.jsx";
import { initLenis, destroyLenis } from "./utils/lenis";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <CartProvider>
        <Routes location={location} key={location.pathname}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:category" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product" element={<Products />} />
            <Route path="/cart" element={<AddToCart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="products" element={<DashboardProduct />} />
            <Route path="order" element={<Order />} />
            <Route path="add" element={<AddProduct />} />
            <Route path="edit" element={<EditProductPage />} />
          </Route>
        </Routes>
      </CartProvider>
    </AnimatePresence>
  );
};

const App = () => {
  useEffect(() => {
    initLenis();
    return () => destroyLenis();
  }, []);

  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
};

export default App;
