import config from '../config';
import React, { useState } from "react";

import BuyActionWindow from "./BuyActionWindow";
import { holdings as initialHoldings, positions as initialPositions } from "../data/data";

const GeneralContext = React.createContext({
  openBuyWindow: (uid, mode) => {},
  closeBuyWindow: () => {},
  holdings: [],
  positions: [],
  orders: [],
  addOrder: (order) => {},
  updateHoldings: (stockName, qty, price, mode) => {},
  updatePositions: (stockName, qty, price, mode) => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [orderMode, setOrderMode] = useState("BUY");
  const [holdings, setHoldings] = useState([...initialHoldings]);
  const [positions, setPositions] = useState([...initialPositions]);
  const [orders, setOrders] = useState([]);

  const handleOpenBuyWindow = (uid, mode = "BUY") => {
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
    setOrderMode(mode);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
    setOrderMode("BUY");
  };

  import config from '../config';

const addOrder = async (order) => {
  const newOrder = {
    ...order,
    id: Date.now(),
    timestamp: new Date().toISOString(),
    status: "COMPLETE",
  };
  
  // Save to backend
  try {
    const token = localStorage.getItem('token');
    await fetch(`${config.API_URL}/newOrder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newOrder),
      credentials: 'include'
    });
  } catch (error) {
    console.error('Error saving order:', error);
  }
  
  setOrders((prev) => [newOrder, ...prev]);
  return newOrder;
};

  const updateHoldings = (stockName, qty, price, mode) => {
    setHoldings((prev) => {
      const existingIndex = prev.findIndex((h) => h.name === stockName);
      
      if (existingIndex >= 0) {
        const existing = prev[existingIndex];
        if (mode === "BUY") {
          const totalQty = existing.qty + qty;
          const totalCost = existing.avg * existing.qty + price * qty;
          const newAvg = totalCost / totalQty;
          return prev.map((h, idx) =>
            idx === existingIndex
              ? { ...h, qty: totalQty, avg: newAvg, price: price }
              : h
          );
        } else {
          const newQty = existing.qty - qty;
          if (newQty <= 0) {
            return prev.filter((h) => h.name !== stockName);
          }
          return prev.map((h, idx) =>
            idx === existingIndex ? { ...h, qty: newQty, price: price } : h
          );
        }
      } else {
        if (mode === "BUY") {
          return [
            ...prev,
            {
              name: stockName,
              qty: qty,
              avg: price,
              price: price,
              net: "0.00%",
              day: "0.00%",
            },
          ];
        }
        return prev;
      }
    });
  };

  const updatePositions = (stockName, qty, price, mode) => {
    setPositions((prev) => {
      const existingIndex = prev.findIndex((p) => p.name === stockName);
      
      if (existingIndex >= 0) {
        const existing = prev[existingIndex];
        if (mode === "BUY") {
          const totalQty = existing.qty + qty;
          const totalCost = existing.avg * existing.qty + price * qty;
          const newAvg = totalCost / totalQty;
          return prev.map((p, idx) =>
            idx === existingIndex
              ? { ...p, qty: totalQty, avg: newAvg, price: price }
              : p
          );
        } else {
          const newQty = existing.qty - qty;
          if (newQty <= 0) {
            return prev.filter((p) => p.name !== stockName);
          }
          return prev.map((p, idx) =>
            idx === existingIndex ? { ...p, qty: newQty, price: price } : p
          );
        }
      } else {
        if (mode === "BUY") {
          return [
            ...prev,
            {
              product: "CNC",
              name: stockName,
              qty: qty,
              avg: price,
              price: price,
              net: "0.00%",
              day: "0.00%",
            },
          ];
        }
        return prev;
      }
    });
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        holdings,
        positions,
        orders,
        addOrder,
        updateHoldings,
        updatePositions,
      }}
    >
      {props.children}
      {isBuyWindowOpen && (
        <BuyActionWindow uid={selectedStockUID} mode={orderMode} />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
