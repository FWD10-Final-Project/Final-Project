import React, { useState, useEffect, useContext } from "react";
import styles from "./CartCheckPay.module.css";
import processCart from "./processCart.png";
import precessInfo from "./processInfo.png";
import precessPay from "./processPay.png";
import bin from "./bin.png";
import paypal from "./paypal.png";
import { CartContext } from "../context/CartContext";
import { toPng } from "html-to-image";
import { useRef } from "react";

function CartPage() {
  const { cart } = useContext(CartContext);
  const { currency } = useContext(CartContext);
  const { currencyRate } = useContext(CartContext);
  const { setCart } = useContext(CartContext);
  console.log(window.innerWidth);
  const deleteItem = (e) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      const CartAfterRemove = cart.filter((x) => x.id !== e);
      setCart(CartAfterRemove);
      return CartAfterRemove;
    }
  };

  const lessQty = (e) => {
    const CartAfterMinus = cart.map((x) => {
      if (x.id === e) {
        if (x.qty > 1) {
          return { ...x, qty: x.qty - 1 };
        } else {
          console.log(x.qty, "only 1 left");
          /* return deleteItem(e); */
        }
      }
      return x;
    });
    setCart(CartAfterMinus);
  };

  const moreQty = (e) => {
    const CartAfterPlus = cart.map((x) => {
      if (x.id === e) {
        return { ...x, qty: x.qty + 1 };
      }
      return x;
    });
    setCart(CartAfterPlus);
  };

  return (
    <>
      <div className={styles.processContainer}>
        <img
          className={styles.processImg}
          src={processCart}
          alt="process_cart"
        ></img>
      </div>

      <table className={styles.editContainer}>
        {cart.length === 0 ? (
          <div className={styles.msgContainer}>
            <div className={styles.emptymsg}>Your cart is empty.</div>
          </div>
        ) : (
          <>
            <div className={styles.title}>Cart</div>
            <thead className={styles.itemContainer}>
              <td className={styles.picTd}></td>
              <td className={styles.itemSubContainer}>Item Details</td>
              <td className={styles.itemPrice}>Price</td>
              <td className={styles.qtyContainer}>Qty</td>
              <td className={styles.itemTotal}>Total</td>
              <td className={styles.itemRemove}> </td>
            </thead>
            <tbody className={styles.itemContainer}>
              {cart.map(
                (
                  { image, product, ingredients, options, qty, unitPrice, id },
                  i
                ) => {
                  return (
                    <tr className={styles.itemContainer} key={i}>
                      <td className={styles.picTd}>
                        <img
                          className={styles.itemPic}
                          src={image}
                          alt={product}
                        />
                      </td>
                      <td className={styles.itemSubContainer}>
                        <div className={styles.itemName}>{product}</div>
                        <div className={styles.itemDetailContainer}>
                          {ingredients.map((e, index) => {
                            for (let i = 0; i < options.length; i++) {
                              if (options[index] !== "Regular") {
                                return (
                                  <div key={index} className={styles.details}>
                                    - {options[index] + " "}
                                    {e}
                                  </div>
                                );
                              }
                            }
                          })}
                        </div>
                      </td>
                      <td className={styles.itemPrice}>
                        {currency === "HK$"
                          ? `${(unitPrice * currencyRate).toFixed(0)}`
                          : `${(unitPrice * currencyRate).toFixed(1)}`}
                      </td>
                      <td className={styles.qtyContainer}>
                        <div className={styles.qtyBtnContainer}>
                          <button
                            className={styles.cartQtyBtn}
                            onClick={() => lessQty(id)}
                          >
                            {" "}
                            -{" "}
                          </button>
                          <td className={styles.qty}>{qty}</td>
                          <button
                            className={styles.cartQtyBtn}
                            onClick={(e) => moreQty(id)}
                          >
                            {" "}
                            +{" "}
                          </button>
                        </div>
                      </td>
                      <td className={styles.itemTotal}>
                        {currency === "HK$"
                          ? `${currency}${(
                              unitPrice *
                              qty *
                              currencyRate
                            ).toFixed(0)}`
                          : `${currency}${(
                              unitPrice *
                              qty *
                              currencyRate
                            ).toFixed(1)}`}
                      </td>

                      <button
                        className={styles.itemRemove}
                        onClick={() => {
                          deleteItem(id);
                        }}
                      >
                        <img
                          className={styles.trashBinPic}
                          src={bin}
                          alt="remove_btn"
                        />
                      </button>
                    </tr>
                  );
                }
              )}
            </tbody>
          </>
        )}
      </table>
    </>
  );
}

function CheckPage({
  setIsFormFilled,
  name,
  setName,
  phone,
  setPhone,
  address,
  setAddress,
  remark,
  setRemark,
  handleInputChange,
}) {
  useEffect(() => {
    if (name && phone && address) {
      setIsFormFilled(true);
    } else {
      setIsFormFilled(false);
    }
  });

  const numVaildkey = [
    "Digit1",
    "Digit2",
    "Digit3",
    "Digit4",
    "Digit5",
    "Digit6",
    "Digit7",
    "Digit8",
    "Digit9",
    "Digit0",
    "Tab",
    "Backspace",
  ];
  return (
    <>
      <div className={styles.processContainer}>
        <img
          className={styles.processImg}
          src={precessInfo}
          alt="process_cart"
        ></img>
      </div>
      <div className={styles.editContainer}>
        <div className={styles.title}>Order Detail</div>

        <form className={styles.inputContainer}>
          <div className={styles.checkTitle}>Name</div>
          <div className={styles.nameContainer}>
            <select className={styles.nameTitle}>
              <option value="Mx">Mx.</option>
              <option value="Mr">Mr.</option>
              <option value="Mrs">Mrs.</option>
              <option value="Miss">Miss</option>
            </select>
            <input
              onChange={(e) => handleInputChange(e, setName, 1)}
              className={styles.name}
              placeholder="Dave the magical cheese wizard"
              required
              value={name}
            ></input>
          </div>
          <div className={styles.checkTitle}>Phone no.</div>
          <input
            type="text"
            onChange={(e) => handleInputChange(e, setPhone)}
            className={styles.tel}
            placeholder="9434 0674"
            required
            value={phone}
            maxlength={8}
            onKeyDown={(e) => {
              if (!numVaildkey.includes(e.code)) {
                e.preventDefault();
              }
            }}
          ></input>
          <div className={styles.checkTitle}>Address</div>
          <textarea
            onChange={(e) => handleInputChange(e, setAddress)}
            className={styles.address}
            placeholder="Don't worry, just for the food"
            required
            value={address}
          ></textarea>
          <div className={styles.checkTitle}>Remark</div>
          <textarea
            onChange={(e) => handleInputChange(e, setRemark)}
            className={styles.remark}
            placeholder="(optional)
Anything that our delivery man should know or be care of like: DON'T TELL MY WIFE"
            required
            value={remark}
          ></textarea>
        </form>
      </div>
    </>
  );
}

function CreditcardForm({
  cardName,
  setCardName,
  cardNum,
  setCardNum,
  cardDate,
  setCardDate,
  cardCvc,
  setCardCvc,
  handleInputChange,
  setIsPayment,
}) {
  useEffect(() => {
    if (cardName && cardNum && cardDate && cardCvc) {
      setIsPayment(true);
    } else {
      setIsPayment(false);
    }
  });

  const numVaildkey = [
    "Digit1",
    "Digit2",
    "Digit3",
    "Digit4",
    "Digit5",
    "Digit6",
    "Digit7",
    "Digit8",
    "Digit9",
    "Digit0",
    "Tab",
    "Backspace",
  ];
  return (
    <div className={styles.creditcardContainer}>
      <div className={styles.inputContainer}>
        Name
        <input
          onChange={(e) => handleInputChange(e, setCardName, 1)}
          className={styles.cardname}
          placeholder="Name on card"
          required
          value={cardName}
        ></input>
        Credit Card No.
        <input
          onChange={(e) => handleInputChange(e, setCardNum, 2)}
          className={styles.expdate}
          placeholder="0000 0000 0000 0000"
          required
          value={cardNum}
          minLength={19}
          maxLength={19}
          onKeyDown={(e) => {
            if (!numVaildkey.includes(e.code)) {
              e.preventDefault();
            }
          }}
        ></input>
        Expiration Date
        <input
          onChange={(e) => handleInputChange(e, setCardDate)}
          className={styles.cvc}
          placeholder="DD/YYYY"
          required
          value={cardDate}
          type="date"
          minLength={6}
          maxLength={6}
          onKeyDown={(e) => {
            if (!numVaildkey.includes(e.code)) {
              e.preventDefault();
            }
          }}
        ></input>
        Security Code
        <input
          onChange={(e) => handleInputChange(e, setCardCvc)}
          className={styles.cvc}
          placeholder="cvc"
          required
          value={cardCvc}
          minLength={3}
          maxLength={3}
          onKeyDown={(e) => {
            if (!numVaildkey.includes(e.code)) {
              e.preventDefault();
            }
          }}
        ></input>
      </div>
    </div>
  );
}

function PayPage({
  cardName,
  setCardName,
  cardNum,
  setCardNum,
  cardDate,
  setCardDate,
  cardCvc,
  setCardCvc,
  handleInputChange,
  setOrderNum,
  setIsPayment,
  show,
  setShow,
}) {
  const radioHandler = (show) => {
    setShow(show);
    if (show !== 1) setIsPayment(true);
    else setIsPayment(false);
  };

  return (
    <>
      <div className={styles.processContainer}>
        <img
          className={styles.processImg}
          src={precessPay}
          alt="process_pay"
        ></img>
      </div>
      <div className={styles.editContainer}>
        <div className={styles.title}>Payment</div>
        <form className={styles.paymentContainer}>
          <div className={styles.paymentOption}>
            <input
              type="radio"
              name="payment"
              value="Cash"
              className={styles.radio}
              checked={show === 0}
              onChange={() => radioHandler(0)}
            ></input>
            <label className={styles.payLabel}>Cash on Delivery</label>
          </div>
          <div className={styles.paymentOption}>
            <input
              type="radio"
              name="payment"
              value="creditcard"
              className={styles.radio}
              checked={show === 1}
              onChange={() => radioHandler(1)}
            ></input>
            <label className={styles.payLabel}> Creditcard</label>
          </div>
          {show === 1 && (
            <div className={styles.divToShow}>
              <CreditcardForm
                cardName={cardName}
                setCardName={setCardName}
                cardNum={cardNum}
                setCardNum={setCardNum}
                cardDate={cardDate}
                setCardDate={setCardDate}
                cardCvc={cardCvc}
                setCardCvc={setCardCvc}
                handleInputChange={handleInputChange}
                setOrderNum={setOrderNum}
                setIsPayment={setIsPayment}
              />
            </div>
          )}
          <div className={styles.paymentOption}>
            <input
              type="radio"
              name="payment"
              value="paypal"
              className={styles.radio}
              checked={show === 2}
              onChange={() => radioHandler(2)}
            ></input>
            <label className={styles.payLabel}>
              <img className={styles.paypal} src={paypal} alt="paypal"></img>
            </label>
          </div>
        </form>
      </div>
    </>
  );
}

function FinishPage({ orderNum }) {
  const elementRef = useRef(null);
  const htmlToImageConvert = () => {
    toPng(elementRef.current, {
      cacheBust: false,
      style: {
        width: "100%",
        height: "auto",
      },
    })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "Your-Burger.png";
        link.href = dataUrl;
        link.style.display = "none"; // Hide the link
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={styles.finisgPageContainer}>
      <div className={styles.htmlToImgContainer} ref={elementRef}>
        <div className={styles.finishOrderContainer}>
          <div className={styles.finishMsg}> Your Order Number is:</div>
          <div className={styles.orderNum}>#{orderNum}</div>
          <div className={styles.finishMsg}>
            Our delivery will arrive very soon!
          </div>
        </div>
      </div>
      <button className={styles.receiptBtn} onClick={htmlToImageConvert}>
        download your receipt
      </button>
    </div>
  );
}

function WholeOrder({ address, deliveryFee, setDeliveryFee }) {
  const { cart } = useContext(CartContext);
  const { currency } = useContext(CartContext);
  const { currencyRate } = useContext(CartContext);

  let subTotal = cart.reduce(function (prev, current) {
    return prev + +(current.unitPrice * current.qty);
  }, 0);

  if (address) setDeliveryFee(10);
  else setDeliveryFee(0);

  return (
    <>
      {cart.length === 0 ? (
        <div className={styles.msgContainer}>
          <div className={styles.emptymsg}>Your cart is empty.</div>
        </div>
      ) : (
        <tbody className={styles.orderContainer}>
          {cart.map(
            (
              { product, ingredients, options, qty, unitPrice, totalPrice },
              i
            ) => {
              return (
                <tr className={styles.checkItemContainer} key={i}>
                  <td className={styles.qty}>{qty}x</td>
                  <td className={styles.checkItemNameContainer}>
                    <div className={styles.itemName}>{product}</div>
                    <div className={styles.itemDetailContainer}>
                      {ingredients.map((e, index) => {
                        for (let i = 0; i < options.length; i++) {
                          if (options[index] !== "Regular") {
                            return (
                              <div key={index} className={styles.details}>
                                - {options[index] + " "}
                                {e}
                              </div>
                            );
                          }
                        }
                      })}
                    </div>
                  </td>

                  <td className={styles.itemTotal}>
                    {currency === "HK$"
                      ? `${unitPrice * qty * currencyRate}`
                      : `${(unitPrice * qty * currencyRate).toFixed(1)}`}
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      )}
      <div className={styles.summary}>
        <div className={styles.subTotal}>
          {currency === "HK$" ? (
            <>
              <div>Subtotal:</div>
              <div className={styles.summyPrice}>
                {currency}
                {subTotal * currencyRate}
              </div>
            </>
          ) : (
            <>
              <div>Subtotal:</div>
              <div className={styles.summyPrice}>
                {currency}
                {(subTotal * currencyRate).toFixed(1)}
              </div>
            </>
          )}
        </div>
        <div className={styles.deliveryFee}>
          {currency === "HK$" ? (
            <>
              <div>Delivery Fee:</div>
              <div className={styles.summyPrice}>
                {currency}
                {deliveryFee * currencyRate}
              </div>
            </>
          ) : (
            <>
              <div>Delivery Fee:</div>
              <div className={styles.summyPrice}>
                {currency}
                {(deliveryFee * currencyRate).toFixed(1)}
              </div>
            </>
          )}
        </div>
        <div className={styles.grandTotal}>
          {currency === "HK$" ? (
            <>
              <div>Grand Total:</div>
              <div className={styles.summyPrice}>
                {currency}
                {(subTotal + deliveryFee) * currencyRate}
              </div>
            </>
          ) : (
            <>
              <div>Grand Total:</div>
              <div className={styles.summyPrice}>
                {currency}
                {((subTotal + deliveryFee) * currencyRate).toFixed(1)}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function CartCheckPay() {
  const [currentPage, setCurrentPage] = useState("cart");
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [remark, setRemark] = useState("");
  const [deliveryFee, setDeliveryFee] = useState(0);
  const { cart } = useContext(CartContext);
  const { setCart } = useContext(CartContext);
  const [isPayment, setIsPayment] = useState(false);
  const [cardName, setCardName] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [cardDate, setCardDate] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [show, setShow] = useState(null);
  const { orderNum, setOrderNum } = useContext(CartContext);
  const { setSum } = useContext(CartContext);
  const handleInputChange = (e, setter, type) => {
    if (type === 1) {
      setter(e.target.value.replace(/[^a-z]/gi, ""));
    } else if (type === 2) {
      setter(e.target.value.replace(/\s/g, "").replace(/(.{4})/g, "$1 "));
    } else {
      setter(e.target.value);
      console.log(e.target.maxLength);
    }

    if (setter === setName || setter === setPhone || setter === setAddress) {
      if (name && phone && address) {
        setIsFormFilled(true);
      } else {
        setIsFormFilled(false);
      }
    }

    if (
      setter === setCardName ||
      setter === setCardNum ||
      setter === setCardDate ||
      setter === setCardCvc
    ) {
      if (cardName && cardNum && cardDate && cardCvc) {
        setIsPayment(true);
      } else {
        setIsPayment(false);
      }
    }
  };

  const handleNext = () => {
    if (currentPage === "cart" && cart.length > 0) {
      setCurrentPage("check");
    } else if (currentPage === "check") {
      setCurrentPage("pay");
    }
  };

  const handleBack = () => {
    if (currentPage === "pay") {
      setCurrentPage("check");
    } else if (currentPage === "check") {
      setCurrentPage("cart");
    }
  };

  function handlePay() {
    //change page
    setCurrentPage("finish");
    //clear cart
    setCart([]);
    setSum(0);
    //clear deliveryFee
    setAddress("");
    //generate a order from #0000
    setOrderNum(String(parseInt(orderNum, 10) + 1).padStart(4, "0"));
  }

  return (
    <div className={styles.cartCheckPayContainer}>
      <div className={styles.leftContainer}>
        {currentPage === "cart" && <CartPage />}
        {currentPage === "check" && (
          <CheckPage
            setIsFormFilled={setIsFormFilled}
            name={name}
            setName={setName}
            phone={phone}
            setPhone={setPhone}
            address={address}
            setAddress={setAddress}
            remark={remark}
            setRemark={setRemark}
            handleInputChange={handleInputChange}
          />
        )}
        {currentPage === "pay" && (
          <PayPage
            cardName={cardName}
            setCardName={setCardName}
            cardNum={cardNum}
            setCardNum={setCardNum}
            cardDate={cardDate}
            setCardDate={setCardDate}
            cardCvc={cardCvc}
            setCardCvc={setCardCvc}
            handleInputChange={handleInputChange}
            setOrderNum={setOrderNum}
            setIsPayment={setIsPayment}
            show={show}
            setShow={setShow}
          />
        )}
        {currentPage === "finish" && <FinishPage orderNum={orderNum} />}
        <div className={styles.btnContainer}>
          {currentPage !== "cart" && currentPage !== "finish" && (
            <button type="submit" className={styles.Btn} onClick={handleBack}>
              Back
            </button>
          )}
          {currentPage === "cart" && cart.length > 0 && (
            <button type="submit" className={styles.Btn} onClick={handleNext}>
              Next
            </button>
          )}
          {currentPage === "check" && isFormFilled && (
            <button type="submit" className={styles.Btn} onClick={handleNext}>
              Next
            </button>
          )}
          {currentPage === "pay" && isPayment && show !== null && (
            <button type="submit" className={styles.Btn} onClick={handlePay}>
              Pay
            </button>
          )}
        </div>
      </div>
      <div className={styles.rightContainer}>
        <WholeOrder
          address={address}
          deliveryFee={deliveryFee}
          setDeliveryFee={setDeliveryFee}
        />
      </div>
    </div>
  );
}

export default CartCheckPay;
