import React from "react";
import "../../styles/Registers.css"

function OrderTotal({ ordersGeneralTotal }) {
  return (
    <div className="flx register-card total-card">
      <span className="flx flx-center count">{ordersGeneralTotal.totalCount}</span>
      <div className="flx info-total">
        <div className="flx info-detail">
          <span className="total">{(ordersGeneralTotal.totalSell).toFixed(2)}</span>
          <span className="abono">{(ordersGeneralTotal.abonos).toFixed(2)}</span>
          <span className="saldo">{(ordersGeneralTotal.saldo).toFixed(2)}</span>
          <span className="profit">{(ordersGeneralTotal.profit).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export { OrderTotal };