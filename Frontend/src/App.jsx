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
import AddToCart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AddressPage from "./pages/Address";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import DashboardProduct from "./pages/dashboard/Product.jsx";
import Order from "./pages/dashboard/Order.jsx"
import AddProduct from "./pages/dashboard/AddProduct.jsx";
import EditProductPage from "./pages/dashboard/EditProductPage.jsx";
import ShowcaseManager from "./pages/dashboard/ShowcaseManager.jsx";
import OrderDetails from "./pages/dashboard/AdminOrderDetail.jsx";
import ContactPage from "./pages/dashboard/ContactPage.jsx";
import { initLenis, destroyLenis } from "./utils/lenis";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminRoute from "./routes/AdminRoute";
import NotFound from "./pages/NotFound";
import PaymentPage from "./pages/Payments";
import PaymentSuccess from "./pages/PaymentSucess.jsx";
import PaymentPending from "./pages/PaymentPending.jsx";
import PaymentFailed from "./pages/PaymentFailed.jsx";
import PaymentCallback from "./pages/PaymentCallback.jsx";
import MyOrder from "./pages/MyOrders.jsx"

const AnimatedRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    // Lenis use ho raha ho to
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: false });
    }
  }, [location.pathname]);

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
              <Route path="/info/products/:id" element={<Products />} />
              <Route path="/cart" element={<AddToCart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/address" element={<AddressPage />} />

              {/* PAYMENT FLOW */}
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/payment/callback" element={<PaymentCallback />} />
              <Route path="/payment/success" element={<PaymentSuccess />} />
              <Route path="/payment/pending" element={<PaymentPending />} />
              <Route path="/payment/failed" element={<PaymentFailed />} />

              <Route path="/my-orders" element={<MyOrder />} />
            </Route>
            <Route path="/adminlogin" element={<AdminLogin />} />
            {/* Dashboard Routes */}
            <Route
              path="/trendclips/secure-panel-x308/dashboard"
              element={
                <AdminRoute>
                  <DashboardLayout />
                </AdminRoute>
              }
            >
              <Route index element={<DashboardHome />} />
              <Route path="products" element={<DashboardProduct />} />
              <Route path="order" element={<Order />} />
              <Route path="add" element={<AddProduct />} />
              <Route path="edit" element={<EditProductPage />} />
              <Route path="showcase" element={<ShowcaseManager />} />
              <Route path="details/:id" element={<OrderDetails />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
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
