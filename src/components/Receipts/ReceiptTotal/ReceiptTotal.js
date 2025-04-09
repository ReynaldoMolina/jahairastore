import React from "react";
import "../../styles/Registers.css";

function ReceiptTotal({ receiptsGeneralTotal }) {
  return (
    <div className="flx register-card total-card">
      <span className="flx flx-center count">{receiptsGeneralTotal.totalCount}</span>
      <div className="flx info-total">
        <div className="flx info-detail">
          <span className="total-spacer"></span>
          <span className="abono">{(receiptsGeneralTotal.abono).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export { ReceiptTotal };