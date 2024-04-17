import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [sum, setSum] = useState(0);
  const [stage, setStage] = useState("menu");
  const [currencyRate, setCurrencyRate] = useState(1);
  const [currency, setCurrency] = useState("HK$");
  const apiKey = process.env.REACT_APP_API_KEY;
  const [qty, setQty] = useState(1);
  const [orderNum, setOrderNum] = useState("0000");
  const [currentPage, setCurrentPage] = useState("cart");
  const [burger, setBurger] = useState({
    product: "",
    ingredients: [],
    options: [],
    qty: 1,
    unitPrice: "",
    totalPrice: "" * qty,
    image: "",
  });

  async function currencyData() {
    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${apiKey}/latest/HKD`
      );
      const data = await response.json();
      let result = data.conversion_rates.USD;
      setCurrencyRate(result);
      setCurrency("US$");
    } catch (error) {
      console.log("Fatching error");
    }
  }

  function changeCurrency() {
    if (currency == "US$") {
      setCurrency("HK$");
      setCurrencyRate(1);
      console.log(currencyRate);
      console.log(currency);
    } else if (currency == "HK$") {
      currencyData();
      console.log(currencyRate);
      console.log(currency);
    }
  }

  function modify() {
    setStage("modify");
  }

  function menu() {
    window.scrollTo(0, 0);

    setStage("menu");
  }

  const addToCart = (burger) => {
    const existingItem = cart.find((item) => {
      return (
        item.product === burger.product &&
        item.image === burger.image &&
        item.options.every((option, j) => option === burger.options[j])
      );
    });
    if (existingItem) {
      const updatedCart = cart.map((item) => {
        if (item === existingItem) {
          return {
            ...item,
            qty: item.qty + burger.qty,
          };
        }
        return {
          ...item,
          id: item.id,
        };
      });
      console.log(updatedCart);
      setCart(updatedCart);
    } else {
      setCart((prevCart) => [...prevCart, burger]);
    }
  };

  function cartSum(cart) {
    let sumOfArr = 0;
    if (cart.length > 0) {
      for (let i = 0; i < cart.length; i++) {
        sumOfArr += cart[i].qty;
      }
    }
    setSum(sumOfArr);
  }

  useEffect(() => {
    if (cart && cart.length > 0) {
      cartSum(cart);
    } else if (cart.length == 0) {
      setSum(0);
    }
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        stage,
        menu,
        modify,
        changeCurrency,
        currencyRate,
        currency,
        burger,
        setBurger,
        qty,
        setQty,
        sum,
        setSum,
        setOrderNum,
        orderNum,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
