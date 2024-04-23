import classes from "./burgerCm.module.css";
import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRef } from "react";
import { toPng } from "html-to-image";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function BurgerCm() {
  const { addToCart } = useContext(CartContext);
  const [image, setImage] = useState("");
  const { currency } = useContext(CartContext);
  const { currencyRate } = useContext(CartContext);

  const htmlToImageConvert = async () => {
    try {
      const dataUrl = await toPng(elementRef.current, { cacheBust: false });
      const link = document.createElement("a");
      link.download = "my-image-name.png";
      link.href = dataUrl;
      setImage(dataUrl);
      setBurger((prevBurger) => ({ ...prevBurger, image: dataUrl }));
    } catch (err) {
      console.log(err);
    }
  };

  const ingredients = [
    "Cheese",
    "Shrimp-Cake",
    "Grilled-Chicken",
    "Teriyaki-chicken",
    "Filet-O-Fish",
    "Patties",
    "Mushroom",
    "Lettuce",
    "Tomato",
    "Onion",
    "Avocado",
  ];
  const elementRef = useRef(null);

  const prices = [8, 15, 15, 15, 15, 8, 8, 8, 8, 8, 8];
  const [totalCost, setTotalCost] = useState(0);
  const [index, setIndex] = useState(Array(ingredients.length).fill(0));
  const [burger, setBurger] = useState({
    id: uuidv4(),
    product: "Custom made Burger",
    ingredients: [],
    options: [],
    qty: 1,
    unitPrice: "",
    totalPrice: "",
    image: image,
  });
  const [link, setlink] = useState(false);

  function AddIngredients(i) {
    if (index[i] < 3) {
      index[i] += 1;
      setIndex(index);
      setTotalCost((prevTotal) => prevTotal + prices[i]);
      htmlToImageConvert();
      setBurger((prevBurger) => ({
        ...prevBurger,
        totalPrice: totalCost + prices[i],
        unitPrice: totalCost + prices[i],
        ingredients: ingredients.filter((_, idx) => index[idx] > 0),
        options: index.filter((value) => value > 0),
      }));
    }
  }

  function DelIngredients(i) {
    if (index[i] > 0) {
      index[i] -= 1;
      setIndex(index);
      setTotalCost((prevTotal) => prevTotal - prices[i]);
      htmlToImageConvert();
      setBurger((prevBurger) => ({
        ...prevBurger,
        totalPrice: totalCost + prices[i],
        unitPrice: totalCost + prices[i],
        ingredients: ingredients.filter((_, idx) => index[idx] > 0),
        options: index.filter((value) => value > 0),
      }));
    }
  }

  async function handleAddToCart(updatedOutputObject) {
    console.log(updatedOutputObject);
    addToCart(updatedOutputObject);
  }
  function handelingSummit() {
    if (index.every((item) => item === 0)) {
      alert("Please add ingredients to your burger!");
    } else {
      handleAddToCart(burger);
      alert(`The Custom made burger has been added to your cart!`);
    }
  }

  return (
    <div className={classes.bigContainer}>
      <div className={classes.bigTitle}>Customization</div>
      <div className={classes.wrapper}>
        <div className={classes.buttonSection}>
          <div className={classes.title}>Ingredient</div>
          <ul className={classes.allIngredientsContainer}>
            {ingredients.map((ingredient, i) => (
              <li className={classes.ingredientContainer} key={i}>
                <div className={classes.ingredientName}>{ingredient} :</div>
                <div className={classes.btn}>
                  <button
                    className={classes.ingredientButton}
                    onClick={() => {
                      DelIngredients(i);
                    }}
                  >
                    -
                  </button>
                  <div className={classes.index}>{index[i]}</div>
                  <button
                    className={classes.ingredientButton}
                    onClick={() => {
                      AddIngredients(i);
                    }}
                  >
                    {" "}
                    +{" "}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className={classes.cmDiv}>
          <div className={classes.burger} ref={elementRef}>
            <div className={classes.burgerbottom}></div>
            {ingredients.map((ingredient, i) => {
              const count = index[i];
              const ingredientDivs = [];

              for (let j = 0; j < count; j++) {
                ingredientDivs.push(
                  <div
                    key={`${ingredient}-${j}`}
                    className={classes[`${ingredient}`]}
                    style={{
                      marginTop: `-40px`,
                      position: `relative`,
                    }}
                  ></div>
                );
              }
              return ingredientDivs;
            })}

            <div className={classes.burgertop}></div>
          </div>
          <div className={classes.totalCost}>
            Total :
            <div className={classes.costNum}>
              {currency === "HK$"
                ? `${currency} ${(totalCost * currencyRate).toFixed(0)}`
                : `${currency} ${(totalCost * currencyRate).toFixed(1)}`}
            </div>
          </div>
        </div>
      </div>
      {!link ? (
        <a href="#" className={classes.atcBtnContainer}>
          <button className={classes.summitButton} onClick={handelingSummit}>
            Add to cart
          </button>
        </a>
      ) : (
        <Link className={classes.atcBtnContainer} to="/online-order">
          <button className={classes.summitButton} onClick={handelingSummit}>
            Add to cart
          </button>
        </Link>
      )}
    </div>
  );
}

export default BurgerCm;
