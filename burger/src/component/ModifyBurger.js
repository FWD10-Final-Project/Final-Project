import styles from "./ModifyBurger.module.css";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { v4 as uuidv4 } from "uuid";

function ModifyBurger({ backBtn }) {
  const { addToCart } = useContext(CartContext);
  const { currencyRate } = useContext(CartContext);
  const { currency } = useContext(CartContext);
  const { qty, setQty } = useContext(CartContext);
  const { burger, setBurger } = useContext(CartContext);
  const [index, setIndex] = useState(Array(burger.ingredients.length).fill(1));
  let option = ["More", "Regular", "Less", "No"];

  function handleAddToCart(burger) {
    addToCart(burger);
    backBtn();
    setQty(1);
  }

  useEffect(() => {
    addId(burger);
  }, []);

  function addId(burger) {
    setBurger({
      ...burger,
      id: uuidv4(),
    });
  }

  function lessIngred(i) {
    if (index[i] < option.length - 1) {
      const newIndex = [...index];
      newIndex[i]++;
      setIndex(newIndex);
      setBurger((prevBurger) => ({
        ...prevBurger,
        options: newIndex.map((item, i) => {
          return option[item];
        }),
      }));
    }
  }

  function moreIngred(i) {
    if (index[i] > 0) {
      const newIndex = [...index];
      newIndex[i]--;
      setIndex(newIndex);
      setBurger((prevBurger) => ({
        ...prevBurger,
        options: newIndex.map((item) => {
          return option[item];
        }),
      }));
    }
  }

  function moreQty() {
    setQty(qty + 1);
    setBurger((prevBurger) => ({
      ...prevBurger,
      qty: qty + 1,
      totalPrice: prevBurger.unitPrice * (qty + 1),
    }));
  }

  function lessQty() {
    if (qty > 1) {
      setQty(qty - 1);
      setBurger((prevBurger) => ({
        ...prevBurger,
        qty: qty - 1,
        totalPrice: prevBurger.unitPrice * (qty - 1),
      }));
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.right}>
        <div className={styles.backContainer}>
          <div className={styles.backBtn} onClick={() => backBtn()}>
            <img
              className={styles.backlogo}
              src="https://www.svgrepo.com/show/324225/navigation-back-arrow.svg"
            />
          </div>
          <div className={styles.title}>{burger.product}</div>
        </div>
        <div className={styles.imageContainer}>
          <img className={styles.image} src={burger.image} />
        </div>
      </div>
      <div className={styles.left}>
        {burger.ingredients.map((item, i) => (
          <div className={styles.ingredient} key={i}>
            <div className={styles.ingredientName}>{item}</div>
            <div className={styles.ingredientBtn}>
              <button
                onClick={() => lessIngred(i)}
                className={styles.abjustBtn}
              >
                {" "}
                -{" "}
              </button>
              <div className={styles.option}>{burger.options[i]}</div>
              <button
                onClick={() => moreIngred(i)}
                className={styles.abjustBtn}
              >
                {" "}
                +{" "}
              </button>
            </div>
          </div>
        ))}
        <div className={styles.qty}>
          <div className={styles.qtyName}>Qty :</div>
          <div className={styles.qtyBtn}>
            <button className={styles.abjustBtn} onClick={() => lessQty()}>
              -
            </button>
            <div className={styles.option}>{qty}</div>
            <button onClick={() => moreQty()} className={styles.abjustBtn}>
              {" "}
              +{" "}
            </button>
          </div>
        </div>
        <div className={styles.price}>
          <div className={styles.priceName}>Price :&nbsp;</div>
          {`${currency}${(burger.unitPrice * currencyRate * qty).toFixed(1)}`}
        </div>
        <div
          className={styles.cart}
          onClick={() => {
            handleAddToCart(burger);
            console.log(burger);
          }}
        >
          Add to Cart
        </div>
      </div>
    </div>
  );
}

export default ModifyBurger;
