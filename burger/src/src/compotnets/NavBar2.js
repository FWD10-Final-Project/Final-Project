import styles from "./NavBar2.module.css";
import logo from "./logo.png";
import shop from "./shop.png";
import currencyLogo from "./currency.png";
import { aboutRef } from "./AboutDiv";
import { ourpdtRef } from "./AboutDiv";
import { contactRef } from "./ContactUs";
import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import hamburgerMenuLogo from "./hamburgerMenuLogo.png";

function Navbar2() {
  const { cart } = useContext(CartContext);
  const { changeCurrency } = useContext(CartContext);

  const handleAboutClick = (x) => {
    x?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <div className={styles.listContainer}>
        <ul className={styles.ul}>
          <li>
            <input type="checkbox" id="list-item-2" className={styles.input} />
            <label htmlFor="list-item-2" className={styles.first}>
              <img
                src={hamburgerMenuLogo}
                alt="hamburgerMenuLogo"
                className={styles.hamburgerMenuLogo}
              />
              <div className={styles.logoDiv}>
                <img src={logo} alt="Logo" className={styles.logo} />
              </div>
            </label>
            <ul className={styles.ul}>
              <Link to="/">
                <li className={styles.one}>Home</li>{" "}
              </Link>
              <Link to="/online-order">
                <li className={styles.two}>Online Order</li>
              </Link>
              <Link to="/">
                <li
                  className={styles.three}
                  onClick={() => handleAboutClick(aboutRef)}
                >
                  About Us
                </li>
              </Link>
              <Link to="/">
                <li
                  className={styles.four}
                  onClick={() => handleAboutClick(ourpdtRef)}
                >
                  Our Product
                </li>
              </Link>
              <Link to="/">
                <li
                  className={styles.five}
                  onClick={() => handleAboutClick(contactRef)}
                >
                  Contact Us
                </li>
              </Link>

              <li className={styles.five}>
                <Link to="/CartCheckPay">
                  <div className={styles.imgDiv}>
                    <img src={shop} alt="shop" className={styles.shop} />
                    {cart.length > 0 && (
                      <div className={styles.cartNum}>({cart.length})</div>
                    )}
                  </div>{" "}
                </Link>
                <div className={styles.imgDiv} onClick={() => changeCurrency()}>
                  <img
                    src={currencyLogo}
                    alt="currency"
                    className={styles.shop}
                  />
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
}

export default Navbar2;
