import { useEffect, useState } from "react";
import PageWrapper from "../components/Loaders/PageWrapper";
import CommonPageLoader from "../components/Loaders/CommonPageLoader";
import ContactUs from "../components/ContactUsComponets/ContactUs";

const Contact = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <PageWrapper>
            {loading ? (
                <CommonPageLoader />
            ) : (
                <div className="mt-4 md:mt-6 lg:mt-8">
                    <ContactUs />
                </div>
            )}
        </PageWrapper>
    );
};

export default Contact;
