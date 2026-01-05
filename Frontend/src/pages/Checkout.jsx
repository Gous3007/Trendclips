import { useEffect, useState } from "react";
import PageWrapper from "../components/Loaders/PageWrapper";
import CheckoutPage from "../components/Checkout/checkoutpage";
import CheckoutPaymentLoader from "../components/Loaders/CheckoutPaymentLoader";

const Checkout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Checkout pages hamesha thoda delay dikhati hain
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <PageWrapper>
      {loading ? (
        <CheckoutPaymentLoader />
      ) : (
        <div className="mt-4 md:mt-6 lg:mt-8">
          <CheckoutPage />
        </div>
      )}
    </PageWrapper>
  );
};

export default Checkout;
