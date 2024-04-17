import classes from "./burgerCm.module.css";
import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRef } from "react";
import { toPng } from "html-to-image";
import { useEffect } from "react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function BurgerCm() {
  const [burger, setBurger] = useState({
    product: "Custom made Burger",
    ingredients: [],
    options: [],
    qty: 1,
    unitPrice: 0,
    totalPrice: 0,
    image: "",
  });
  const { addToCart } = useContext(CartContext);
  const [image, setImage] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    htmlToImageConvert();
    AddIngredients();
  }, []);

  const htmlToImageConvert = async () => {
    try {
      const dataUrl = await toPng(elementRef.current, {
        cacheBust: false,
      });
      const link = document.createElement("a");
      link.download = "my-image-name.png";
      link.href = dataUrl;
      setImage(dataUrl);
      setBurger.image = dataUrl;
    } catch (err) {
      console.log(err);
    }
  };

  const ingredients = [
    "Shrimp-Cake",
    "Grilled-Chicken",
    "Teriyaki-chicken",
    "Filet-O-Fish",
    "Patties",
    "Mushroom",
    "Cheese",
    "Lettuce",
    "Tomato",
  ];
  const elementRef = useRef(null);

  const prices = [12, 15, 15, 15, 15, 8, 8, 8, 8];
  const [totalCost, setTotalCost] = useState(0);
  const [index, setIndex] = useState(Array(ingredients.length).fill(0));
  const [updatedIndex, setupdatedIndex] = useState([]);
  const addedIngredients = [];
  const addedIngredientsIndex = updatedIndex.filter((value) => value !== 0);
  const [link, setlink] = useState(false);

  function AddIngredients(i) {
    setupdatedIndex(index);
    if (updatedIndex[i] < 3) {
      updatedIndex[i] += 1;
      setlink(true);
      setTotalCost((prevTotal) => prevTotal + prices[i]);
      htmlToImageConvert();
      setBurger({
        product: "Custom made Burger",
        id: uuidv4(),
        totalPrice: totalCost + prices[0],
        unitPrice: totalCost + prices[0],
        ingredients: addedIngredients,
        options: addedIngredientsIndex,
        image: image,
        qty: 1,
      });
      console.log(burger);
    }
  }

  function DelIngredients(i) {
    setupdatedIndex(index);
    if (updatedIndex[i] > 0) {
      updatedIndex[i] -= 1;
      setTotalCost((prevTotal) => prevTotal - prices[i]);
    }
    setBurger({
      product: "Custom made Burger",

      id: uuidv4(),
      totalPrice: totalCost,
      unitPrice: totalCost,
      ingredients: addedIngredients,
      options: addedIngredientsIndex,
      image: image,
      qty: 1,
    });
  }
  async function handleAddToCart(updatedOutputObject) {
    htmlToImageConvert();
    console.log(updatedOutputObject);
    addToCart(updatedOutputObject);
  }
  function handelingSummit() {
    if (addedIngredientsIndex.every((item) => item === 0)) {
      alert("Please add ingredients to your burger!");
    } else {
      handleAddToCart(burger);
      setBurger({
        totalPrice: totalCost,
        unitPrice: totalCost,
      });
      alert(`The Custom made burger has been added to your cart!`);
    }
  }

  return (
    <div className={classes.bigContainer}>
      <div className={classes.wrapper}>
        <div className={classes.buttonSection}>
          <p className={classes.title}>Ingredient</p>
          <div className={classes.ingredientBtns}>
            <ul>
              {" "}
              {/*modify*/}
              {ingredients.map((ingredient, i) => (
                <li key={i}>
                  <div className={classes.itemDiv}>
                    {ingredient} :
                    <div className={classes.btn}>
                      {/*modify*/}
                      <button
                        className={classes.ingredientButton}
                        onClick={() => {
                          DelIngredients(i);
                        }}
                      >
                        -
                      </button>
                      <div className={classes.index}>
                        {/*modify*/}
                        {index[i]}
                      </div>
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
                    {/*modify*/}
                  </div>
                </li>
              ))}
            </ul>

            {!link ? (
              <button
                className={classes.summitButton}
                onClick={handelingSummit}
              >
                add to cart
              </button>
            ) : (
              <Link to="/online-order">
                <button
                  className={classes.summitButton}
                  onClick={handelingSummit}
                >
                  add to cart
                </button>
                /
              </Link>
            )}
          </div>
        </div>{" "}
        {/*modify*/}
        <div className={classes.cmDiv}>
          <p className={classes.title}>Customization</p>
          <div className={classes.cmImg}>
            {/*modify*/}
            <p className={classes.totalCost}>
              {/*modify*/}Total Cost: ${totalCost.toFixed(2)}
            </p>
            <div className={classes.burger} ref={elementRef}>
              <div className={classes.burgerbottom}>
                <div className={classes.btext}></div>
              </div>
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
                    >
                      <p className={classes[`ingredient-text`]}>{ingredient}</p>
                    </div>
                  );
                }
                return ingredientDivs;
              })}

              <div className={classes.burgertop}></div>
            </div>
          </div>
          {/*modify*/}
        </div>
      </div>
    </div>
  );
}

export default BurgerCm;
