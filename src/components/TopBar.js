import React, { useState, useEffect } from "react";

import Menu from "./Menu";

const TopBar = () => {
  const [nifty, setNifty] = useState({ value: 22123.35, change: 45.30, percent: 0.21 });
  const [sensex, setSensex] = useState({ value: 72832.85, change: -125.50, percent: -0.17 });

  useEffect(() => {
    const interval = setInterval(() => {
      setNifty((prev) => ({
        value: prev.value + (Math.random() - 0.5) * 10,
        change: prev.change + (Math.random() - 0.5) * 2,
        percent: ((prev.change / prev.value) * 100).toFixed(2),
      }));
      setSensex((prev) => ({
        value: prev.value + (Math.random() - 0.5) * 30,
        change: prev.change + (Math.random() - 0.5) * 5,
        percent: ((prev.change / prev.value) * 100).toFixed(2),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const niftyPercent = ((nifty.change / nifty.value) * 100).toFixed(2);
  const sensexPercent = ((sensex.change / sensex.value) * 100).toFixed(2);
  const niftyIsUp = nifty.change >= 0;
  const sensexIsUp = sensex.change >= 0;

  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points">{nifty.value.toFixed(2)}</p>
          <p className={`percent ${niftyIsUp ? "up" : "down"}`}>
            {niftyIsUp ? "+" : ""}{nifty.change.toFixed(2)} ({niftyIsUp ? "+" : ""}{niftyPercent}%)
          </p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points">{sensex.value.toFixed(2)}</p>
          <p className={`percent ${sensexIsUp ? "up" : "down"}`}>
            {sensexIsUp ? "+" : ""}{sensex.change.toFixed(2)} ({sensexIsUp ? "+" : ""}{sensexPercent}%)
          </p>
        </div>
      </div>

      <Menu />
    </div>
  );
};

export default TopBar;