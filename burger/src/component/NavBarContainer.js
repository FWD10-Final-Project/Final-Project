import NavBar3 from "./NavBar3";
import NavBar from "./NavBar";
import { useState } from "react";
import { useEffect } from "react";

function NavBarContainer() {
  const [mobileSize, setMobileSize] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setMobileSize(window.innerWidth < 480 ? true : false);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return <>{mobileSize ? <NavBar3 /> : <NavBar />}</>;
}
export default NavBarContainer;
