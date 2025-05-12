import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import PageIllustration from "../../../components/page-illustration";
import Hero from "../../../components/hero";
import LandingEvents from "../../../components/landing-events";
import Features from "../../../components/features";
import Testimonials from "../../../components/testimonials";
import Cta from "../../../components/cta";

export default function LandingPage() {
    useEffect(() => {
        AOS.init({
            once: true,
            disable: "phone",
            duration: 600,
            easing: "ease-out-sine",
        });
    });

    return (
        <>
            <PageIllustration />
            <Hero />
            <LandingEvents />
            <Features />
            <Testimonials />
            <Cta />
        </>
    );
}
