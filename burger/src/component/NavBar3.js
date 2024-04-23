import { useState } from "react";
import styles from "./NavBar3.module.css";
import hamburgerMenuLogo from "./hamburgerMenuLogo.png";
import cross from "./cross.png";
import logo from "./logo.png";
import shop from "./shop.png";
import currencyLogo from "./currency.png";
import { aboutRef } from "./AboutDiv";
import { ourpdtRef } from "./AboutDiv";
import { contactRef } from "./ContactUs";
import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const NavBar3 = () => {
  const [imgSrc, setImgSrc] = useState(hamburgerMenuLogo);
  const [hidden, setHidden] = useState(false);
  const { sum } = useContext(CartContext);
  const { changeCurrency } = useContext(CartContext);

  const handleAboutClick = (x) => {
    x?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  function changeLogo() {
    if (imgSrc === hamburgerMenuLogo) {
      setImgSrc(cross);
    } else {
      setImgSrc(hamburgerMenuLogo);
    }
    setHidden(!hidden);
  }

  function collapse() {
    setHidden(false);
    setImgSrc(hamburgerMenuLogo);
  }

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.header} onClick={() => changeLogo()}>
            <div className={styles.left}>
              <img className={styles.menuLogo} src={imgSrc} alt="Menu" />
            </div>
            <div className={styles.right}>
              <img className={styles.menuLogo} src={logo} alt="Logo" />
            </div>
          </div>
        </div>

        <div
          className={
            !hidden
              ? `${styles.listContainer} ${styles.collapse}`
              : styles.listContainer
          }
        >
          <Link to="/">
            <div className={styles.list} onClick={() => collapse()}>
              Home
            </div>
          </Link>
          <Link to="/online-order">
            <div className={styles.list} onClick={() => collapse()}>
              Online Order
            </div>
          </Link>
          <Link to="/">
            <div
              className={styles.list}
              onClick={() => {
                handleAboutClick(aboutRef);
                collapse();
              }}
            >
              About Us
            </div>
          </Link>
          <Link to="/">
            <div
              className={styles.list}
              onClick={() => {
                handleAboutClick(ourpdtRef);
                collapse();
              }}
            >
              Our Product
            </div>
          </Link>
          <Link to="/">
            <div
              className={styles.list}
              onClick={() => {
                handleAboutClick(contactRef);
                collapse();
              }}
            >
              Contact Us
            </div>
          </Link>
          <div className={`${styles.list1} ${styles.logoList}`}>
            <Link to="/CartCheckPay">
              <div className={styles.shop} onClick={() => collapse()}>
                <img className={styles.cartLogo} src={shop} alt="Shop" />
                {sum > 0 && <div className={styles.cartNum}>{sum}</div>}
              </div>
            </Link>
            <div className={styles.currencyLogoContainer}>
              <img
                className={styles.currencyLogo}
                src={currencyLogo}
                alt="Currency"
                onClick={() => {
                  changeCurrency();
                  collapse();
                }}
              />{" "}
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default NavBar3;
