import React, { useContext, useState, useEffect } from "react";
import GeneralContext from "./GeneralContext";

const Summary = () => {
  const context = useContext(GeneralContext);
  const holdings = context.holdings || [];
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Function to load user data
    const loadUserData = () => {
      // First try localStorage
      let userData = localStorage.getItem("user");
      
      // If not in localStorage, try to get from URL
      if (!userData) {
        const urlParams = new URLSearchParams(window.location.search);
        const userDataParam = urlParams.get('user');
        if (userDataParam) {
          try {
            userData = decodeURIComponent(userDataParam);
            localStorage.setItem("user", userData);
          } catch (error) {
            console.error("Error decoding user data from URL:", error);
          }
        }
      }
      
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        } catch (error) {
          console.error("Error parsing user data:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    // Load user data on mount
    loadUserData();

    // Listen for storage changes (when user logs in/out in another tab or window)
    const handleStorageChange = (e) => {
      if (e.key === "user" || e.key === null) {
        loadUserData();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    
    // Also listen for custom event for same-window updates
    window.addEventListener("userDataUpdated", loadUserData);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userDataUpdated", loadUserData);
    };
  }, []);

  const totalInvestment = holdings.reduce(
    (sum, stock) => sum + stock.avg * stock.qty,
    0
  );
  const totalValue = holdings.reduce(
    (sum, stock) => sum + stock.price * stock.qty,
    0
  );
  const pnl = totalValue - totalInvestment;
  const pnlPercent =
    totalInvestment > 0 ? ((pnl / totalInvestment) * 100).toFixed(2) : 0;

  const marginAvailable = 100000;
  const marginsUsed = 0;
  const openingBalance = marginAvailable;

  const formatCurrency = (value) => {
    if (value >= 100000) {
      return (value / 100000).toFixed(2) + "L";
    } else if (value >= 1000) {
      return (value / 1000).toFixed(2) + "k";
    }
    return value.toFixed(2);
  };

  return (
    <>
      <div className="username">
        <h6>Hi, {user && user.name ? user.name : 'User'}!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>{formatCurrency(marginAvailable)}</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>{formatCurrency(marginsUsed)}</span>{" "}
            </p>
            <p>
              Opening balance <span>{formatCurrency(openingBalance)}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({holdings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={pnl >= 0 ? "profit" : "loss"}>
              {formatCurrency(Math.abs(pnl))}{" "}
              <small>
                {pnl >= 0 ? "+" : ""}
                {pnlPercent}%
              </small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{formatCurrency(totalValue)}</span>{" "}
            </p>
            <p>
              Investment <span>{formatCurrency(totalInvestment)}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;