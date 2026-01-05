import { useEffect, useState } from "react";
import PageWrapper from "../components/Loaders/PageWrapper"; // ✅ CORRECT
import CartProduct from "../components/AddToCart/CartProduct";
import CartPaymentLoader from "../components/Loaders/CartPaymentLoader";

const Cart = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <PageWrapper>
      {loading ? (
        <div style={{ minHeight: "70vh" }}>
          <CartPaymentLoader />
        </div>
      ) : (
        <div className="mt-4 md:mt-6 lg:mt-8">
          <CartProduct />
        </div>
      )}
    </PageWrapper>
  );
};

export default Cart;
