import React from "react";
import "./OrderTotal.css"

function OrderTotal({ ordersGeneralTotal }) {
  return (
    <div className="flx ordertotal-card">
      <span className="flx flx-center count">{ordersGeneralTotal.totalCount}</span>
      <div className="flx info">
        <span className="name"></span>
        <div className="flx">
          <span className="total-sell">{(ordersGeneralTotal.totalSell).toFixed(2)}</span>
          <span className="total-abono">{(ordersGeneralTotal.abonos).toFixed(2)}</span>
          <span className="total-saldo">{(ordersGeneralTotal.saldo).toFixed(2)}</span>
          <span className="total-profit">{(ordersGeneralTotal.profit).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export { OrderTotal };