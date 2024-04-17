import NavBar from "./compotnets/NavBar";
import NavBar3 from "./compotnets/NavBar3";
import { Routes, Route } from "react-router-dom";
import Menu from "./compotnets/Menu";
import Home from "./compotnets/Home";
import Footer from "./compotnets/Footer";
import BurgerCm from "./compotnets/burgerCm";
import CartCheckPay from "./compotnets/CartCheckPay";
import { CartProvider } from "./context/CartContext";
import { useState, useEffect } from "react";
import React from "react";

function App() {
  const [tabletSize, setTabletSize] = useState(false);
  const [mobileSize, setMobileSize] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setMobileSize(window.innerWidth < 450 ? true : false);
      setTabletSize(window.innerWidth < 960 ? true : false);
    };
    console.log("window.innerWidth " + window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <CartProvider>
        <Routes>
          <Route path="/" element={mobileSize ? <NavBar3 /> : <NavBar />}>
            <Route index element={<Home tabletSize={tabletSize} />} />
            <Route
              path="/online-order"
              element={<Menu tabletSize={tabletSize} />}
            />
            <Route path="/BurgerCm" element={<BurgerCm />} />
            <Route path="/CartCheckPay" element={<CartCheckPay />} />
          </Route>
        </Routes>
        <Footer />
      </CartProvider>
    </>
  );
}
export default App;
