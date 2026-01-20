import React, { useContext } from "react";
import { Link } from "react-router-dom";
import GeneralContext from "./GeneralContext";

const Orders = () => {
  const context = useContext(GeneralContext);
  const orders = context.orders || [];

  if (orders.length === 0) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <h3 className="title">Orders ({orders.length})</h3>
      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Instrument</th>
              <th>Transaction Type</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              const date = new Date(order.timestamp);
              const timeStr = date.toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              });
              const modeClass = order.mode === "BUY" ? "profit" : "loss";

              return (
                <tr key={order.id || index}>
                  <td>{timeStr}</td>
                  <td>{order.name}</td>
                  <td className={modeClass}>{order.mode}</td>
                  <td>{order.qty}</td>
                  <td>₹{order.price.toFixed(2)}</td>
                  <td>₹{order.total.toFixed(2)}</td>
                  <td className="profit">{order.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Orders;