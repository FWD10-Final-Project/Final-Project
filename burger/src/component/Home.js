import VideoDiv from "./VideoDiv";
import BurgerCarousel from "./BurgerCarousel";
import AboutDiv from "./AboutDiv";
import ContactUs from "./ContactUs";
import React, { useRef } from "react";
import { useEffect } from "react";

function Home({ tabletSize }) {
  const aboutRef = useRef();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="wrapper">
        <VideoDiv tabletSize={tabletSize} />
        <BurgerCarousel />
        <AboutDiv refProps={aboutRef} />
        <ContactUs />
      </div>
    </>
  );
}
export default Home;
