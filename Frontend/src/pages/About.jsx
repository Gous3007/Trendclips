import { useEffect, useState } from "react";
import PageWrapper from "../components/Loaders/PageWrapper";
import CommonPageLoader from "../components/Loaders/CommonPageLoader";

import HeroSection from "../components/AboutComponents/HeroSection";
import OurStory from "../components/AboutComponents/OurStory";
import MissionVission from "../components/AboutComponents/MissionVision";

const About = () => {

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
                <div>
                    <div className="mt-4 md:mt-6 lg:mt-8">  {/* Responsive margin */}
                        <HeroSection />
                        <OurStory />
                        <MissionVission />
                    </div>
                </div>
            )}
        </PageWrapper>
    );
};

export default About;