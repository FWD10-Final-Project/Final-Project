import logo from "./logo.png";
import styles from "./Menu.module.css";
import food from "./food.json";
import { useState } from "react";
import { useEffect } from "react";
import ModifyBurger from "./ModifyBurger";
import customlogo from "./customburger.png";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function Menu({ tabletSize }) {
  const [foodData, setFoodData] = useState([]);
  const [foodtype, setFoodtype] = useState(0);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(1);
  const { menu } = useContext(CartContext);
  const { modify } = useContext(CartContext);
  const { stage } = useContext(CartContext);
  const { currency } = useContext(CartContext);
  const { currencyRate } = useContext(CartContext);
  const { setBurger } = useContext(CartContext);
  const { qty } = useContext(CartContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    handleOnClick();
  }, []);

  function handleOnClick(foodProduct = "Handmade Burger") {
    setFoodData([]);
    setLoading(true);

    if (foodProduct) {
      let data = food[foodProduct];

      data.map((item) => {
        setFoodData((currentArr) => {
          return [...currentArr, item];
        });
      });
      setLoading(false);
    }
  }

  function handleTitle(num) {
    setFoodtype(num);
  }

  function TitleCreator() {
    return (
      <div className={styles.typeTitle}>
        <div className={styles.titleWord}>{Object.keys(food)[foodtype]}</div>
      </div>
    );
  }

  function buyButton() {
    modify();
  }

  function backBtn() {
    menu();
  }

  function clicked(id) {
    setActive(id);
  }

  function MenuCard() {
    return (
      <div className={styles.container}>
        <div className={styles.title}>MENU</div>
        <div
          className={
            active == 1 ? `${styles.cat} ${styles.active}` : styles.cat
          }
          onClick={() => {
            handleOnClick("Handmade Burger");
            handleTitle(0);
            menu();
            clicked(1);
          }}
        >
          <img className={styles.icon} src={logo} />
          Burgers
        </div>
        <div
          className={
            active == 2 ? `${styles.cat} ${styles.active}` : styles.cat
          }
          onClick={() => {
            handleOnClick("Fries");
            handleTitle(1);
            menu();
            clicked(2);
          }}
        >
          <img
            className={styles.icon}
            src="https://i.pinimg.com/originals/37/d4/3a/37d43a16a9f273bf19395d2a6c7060a0.png"
          />
          Fries
        </div>
        <div
          className={
            active == 3 ? `${styles.cat} ${styles.active}` : styles.cat
          }
          onClick={() => {
            handleOnClick("Salad");
            handleTitle(2);
            menu();
            clicked(3);
          }}
        >
          <img
            className={styles.icon}
            src="https://cdn-icons-png.freepik.com/512/5961/5961888.png"
          />
          Salad
        </div>
        <div
          className={
            active == 4 ? `${styles.cat} ${styles.active}` : styles.cat
          }
          onClick={() => {
            handleOnClick("Drinks");
            handleTitle(3);
            menu();
            clicked(4);
          }}
        >
          <img
            className={styles.icon}
            src="https://static.thenounproject.com/png/2601971-200.png"
          />
          Drinks
        </div>
      </div>
    );
  }

  function MenuCard2() {
    return (
      <div className={styles.listContainer}>
        <ul className={styles.ul}>
          <li>
            <input type="checkbox" id="list-item-1" className={styles.input} />
            <label htmlFor="list-item-1" className={styles.first}>
              <div className={styles.menuTwo}>MENU</div>
              <img
                className={styles.logo}
                src="https://www.iconpacks.net/icons/2/free-arrow-down-icon-3101-thumb.png"
                alt="Menu Logo"
              />
            </label>
            <ul className={styles.ul}>
              <li
                className={styles.one}
                onClick={() => {
                  handleOnClick("Handmade Burger");
                  handleTitle(0);
                  menu();
                }}
              >
                Burgers
              </li>
              <li
                className={styles.two}
                onClick={() => {
                  handleOnClick("Fries");
                  handleTitle(1);
                  menu();
                }}
              >
                Fries
              </li>
              <li
                className={styles.three}
                onClick={() => {
                  handleOnClick("Salad");
                  handleTitle(2);
                  menu();
                }}
              >
                Salad
              </li>
              <li
                className={styles.four}
                onClick={() => {
                  handleOnClick("Drinks");
                  handleTitle(3);
                  menu();
                }}
              >
                Drinks
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }

  function FoodCard() {
    return (
      <>
        {foodData[0] && foodData[0].product.includes("Burger") && (
          <div className={styles.foodCard}>
            <div className={styles.foodImageContainer}>
              <img className={styles.foodImage} src={customlogo} />
            </div>
            <div className={styles.wordsContainer}>
              <div className={styles.product}>Custom Burger</div>
              <div className={styles.price}>
                {`${currency}${(8 * currencyRate).toFixed(1)} UP`}
              </div>
              <Link to="/BurgerCm">
                <div className={styles.buyButton}>Order Now</div>
              </Link>
            </div>
          </div>
        )}
        {foodData.map(({ product, image, price, ingredient, type }, i) => {
          return (
            <div className={styles.foodCard} key={i}>
              <div className={styles.foodImageContainer}>
                <img className={styles.foodImage} alt={product} src={image} />
              </div>
              <div className={styles.wordsContainer}>
                <div className={styles.product}>{product}</div>
                {type === "Drinks" ? (
                  <div className={styles.price}>
                    {`${currency}${(price * currencyRate).toFixed(1)}`}
                  </div>
                ) : (
                  <div className={styles.price}>
                    {currency === "HK$"
                      ? `${currency}${price * currencyRate}`
                      : `${currency}${(price * currencyRate).toFixed(1)}`}
                  </div>
                )}
                <div
                  className={styles.buyButton}
                  onClick={() => {
                    setBurger({
                      product: product,
                      ingredients: ingredient,
                      options: Array(ingredient.length).fill("Regular"),
                      qty: 1,
                      unitPrice: price,
                      totalPrice: price * qty,
                      image: image,
                    });
                    buyButton();
                  }}
                >
                  Order Now
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  }

  return (
    <div className={styles.cardContainer}>
      {tabletSize === true ? <MenuCard2 /> : <MenuCard />}
      <div className={styles.right}>
        <TitleCreator />
        <div className={styles.foodCardContainer}>
          {stage == "menu" ? (
            <FoodCard />
          ) : stage == "modify" ? (
            <ModifyBurger backBtn={backBtn} />
          ) : null}

          {loading && (
            <img
              className={styles.loading}
              src="https://www.icegif.com/wp-content/uploads/2023/07/icegif-1263.gif"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Menu;
