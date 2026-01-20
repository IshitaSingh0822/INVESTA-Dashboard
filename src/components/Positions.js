import React, { useContext } from "react";
import GeneralContext from "./GeneralContext";

const Positions = () => {
  const context = useContext(GeneralContext);
  const positions = context.positions || [];

  return (
    <>
      <h3 className="title">Positions ({positions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {positions.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                  No positions available
                </td>
              </tr>
            ) : (
              positions.map((stock, index) => {
                const curValue = stock.price * stock.qty;
                const investment = stock.avg * stock.qty;
                const pnl = curValue - investment;
                const isProfit = pnl >= 0.0;
                const profClass = isProfit ? "profit" : "loss";
                const dayClass = stock.isLoss ? "loss" : "profit";
                const netChange = investment > 0 ? ((pnl / investment) * 100).toFixed(2) : "0.00";

                return (
                  <tr key={index}>
                    <td>{stock.product}</td>
                    <td>{stock.name}</td>
                    <td>{stock.qty}</td>
                    <td>{stock.avg.toFixed(2)}</td>
                    <td>{stock.price.toFixed(2)}</td>
                    <td className={profClass}>
                      {pnl >= 0 ? "+" : ""}{pnl.toFixed(2)}
                    </td>
                    <td className={dayClass}>
                      {netChange >= 0 ? "+" : ""}{netChange}%
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;