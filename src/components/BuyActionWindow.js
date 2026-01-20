import React, { useState, useContext, useEffect } from "react";

import GeneralContext from "./GeneralContext";
import { watchlist } from "../data/data";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, mode = "BUY" }) => {
  const context = useContext(GeneralContext);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);

  useEffect(() => {
    const stock = watchlist.find((s) => s.name === uid);
    if (stock) {
      setStockPrice(stock.price);
    }
  }, [uid]);

  const calculateTotal = () => {
    return stockQuantity * stockPrice;
  };

  const calculateMargin = () => {
    return calculateTotal() * 0.2;
  };

  const handleSubmitClick = () => {
    const qty = parseInt(stockQuantity);
    const price = parseFloat(stockPrice);

    if (qty <= 0 || price <= 0) {
      alert("Please enter valid quantity and price");
      return;
    }

    const order = {
      name: uid,
      qty: qty,
      price: price,
      mode: mode,
      total: calculateTotal(),
    };

    context.addOrder(order);
    context.updateHoldings(uid, qty, price, mode);
    context.updatePositions(uid, qty, price, mode);
    context.closeBuyWindow();
  };

  const handleCancelClick = () => {
    context.closeBuyWindow();
  };

  const isBuy = mode === "BUY";
  const buttonClass = isBuy ? "btn-blue" : "btn-red";
  const buttonText = isBuy ? "Buy" : "Sell";

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="header">
        <h3>
          {uid} <span>{isBuy ? "Buy" : "Sell"}</span>
        </h3>
      </div>
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              min="0"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>
          {isBuy ? "Margin required" : "Total value"}: ₹
          {isBuy
            ? calculateMargin().toFixed(2)
            : calculateTotal().toFixed(2)}
        </span>
        <div>
          <button 
            type="button"
            className={`btn ${buttonClass}`} 
            onClick={handleSubmitClick}
          >
            {buttonText}
          </button>
          <button 
            type="button"
            className="btn btn-grey" 
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;