import { Routes, Route } from "react-router-dom";
import Menu from "./component/Menu";
import Home from "./component/Home";
import Footer from "./component/Footer";
import BurgerCm from "./component/burgerCm";
import CartCheckPay from "./component/CartCheckPay";
import { CartProvider } from "./context/CartContext";
import { useState, useEffect } from "react";
import NavBarContainer from "./component/NavBarContainer";
import React from "react";

function App() {
  const [tabletSize, setTabletSize] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setTabletSize(window.innerWidth < 960 ? true : false);
    };

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
          <Route path="/" element={<NavBarContainer />}>
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
