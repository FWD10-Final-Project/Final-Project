import classes from "./NavBar.module.css";
import logo from "./logo.png";
import shop from "./shop.png";
import currencyLogo from "./currency.png";
import { aboutRef } from "./AboutDiv";
import { ourpdtRef } from "./AboutDiv";
import { contactRef } from "./ContactUs";
import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { sum } = useContext(CartContext);
  const { changeCurrency } = useContext(CartContext);
  const { menu } = useContext(CartContext);

  const handleAboutClick = (x) => {
    x?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <div className={classes.navbar}>
        <div className={classes.leftNavBar}>
          <div className={classes.imgDiv}>
            <Link to="/">
              <img src={logo} alt="Logo" className={classes.logo} />
            </Link>
          </div>
          <div className={classes.onlineorderbutton}>
            <Link to="/online-order">
              <button
                className={classes.textButton}
                onClick={() => {
                  menu();
                }}
              >
                Online Order
              </button>
            </Link>
          </div>

          <div className={classes.aboutbutton}>
            <Link to="/">
              <button
                onClick={() => handleAboutClick(aboutRef)}
                className={classes.textButton}
              >
                About Us
              </button>{" "}
            </Link>
          </div>

          <div className={classes.aboutbutton}>
            <Link to="/">
              <button
                onClick={() => handleAboutClick(ourpdtRef)}
                className={classes.textButton}
              >
                Our Product
              </button>{" "}
            </Link>
          </div>

          <div className={classes.aboutbutton}>
            <Link to="/">
              <button
                onClick={() => handleAboutClick(contactRef)}
                className={classes.textButton}
              >
                Contact Us
              </button>{" "}
            </Link>
          </div>
          <Link to="/CartCheckPay">
            <div className={classes.imgDiv}>
              <img src={shop} alt="shop" className={classes.shop} />
              {sum > 0 && <div className={classes.cartNum}>{sum}</div>}
            </div>{" "}
          </Link>
        </div>

        <div className={classes.rightNavBar}>
          <div className={classes.imgDiv} onClick={() => changeCurrency()}>
            <img src={currencyLogo} alt="currency" className={classes.shop} />
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}
export default Navbar;
