import React, { useContext } from "react";
import { VerticalGraph } from "./VerticalGraph";
import GeneralContext from "./GeneralContext";

const Holdings = () => {
  const context = useContext(GeneralContext);
  const allHoldings = context.holdings || [];

  const labels = allHoldings.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                  No holdings available
                </td>
              </tr>
            ) : (
              allHoldings.map((stock, index) => {
                const curValue = stock.price * stock.qty;
                const investment = stock.avg * stock.qty;
                const pnl = curValue - investment;
                const isProfit = pnl >= 0.0;
                const profClass = isProfit ? "profit" : "loss";
                const dayClass = stock.isLoss ? "loss" : "profit";
                const netChange = ((pnl / investment) * 100).toFixed(2);

                return (
                  <tr key={index}>
                    <td>{stock.name}</td>
                    <td>{stock.qty}</td>
                    <td>{stock.avg.toFixed(2)}</td>
                    <td>{stock.price.toFixed(2)}</td>
                    <td>{curValue.toFixed(2)}</td>
                    <td className={profClass}>
                      {pnl >= 0 ? "+" : ""}{pnl.toFixed(2)}
                    </td>
                    <td className={profClass}>
                      {netChange >= 0 ? "+" : ""}{netChange}%
                    </td>
                    <td className={dayClass}>{stock.day || "0.00%"}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            {allHoldings
              .reduce((sum, stock) => sum + stock.avg * stock.qty, 0)
              .toFixed(2)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            {allHoldings
              .reduce((sum, stock) => sum + stock.price * stock.qty, 0)
              .toFixed(2)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>
            {(() => {
              const totalInvestment = allHoldings.reduce(
                (sum, stock) => sum + stock.avg * stock.qty,
                0
              );
              const totalValue = allHoldings.reduce(
                (sum, stock) => sum + stock.price * stock.qty,
                0
              );
              const pnl = totalValue - totalInvestment;
              const pnlPercent =
                totalInvestment > 0 ? ((pnl / totalInvestment) * 100).toFixed(2) : 0;
              return `${pnl >= 0 ? "+" : ""}${pnl.toFixed(2)} (${pnlPercent >= 0 ? "+" : ""}${pnlPercent}%)`;
            })()}
          </h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;