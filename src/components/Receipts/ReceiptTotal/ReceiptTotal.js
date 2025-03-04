import React from "react";
import "./ReceiptTotal.css"

function ReceiptTotal({ receiptsGeneralTotal }) {
  return (
    <div className="flx receipttotal-card">
      <span className="flx flx-center count">{receiptsGeneralTotal.totalCount}</span>
      <div className="flx info">
        <span className="name"></span>
        <div className="flx">
          <span className="date"></span>
          <span className="total-spacer"></span>
          <span className="total-abono-receipt">{(receiptsGeneralTotal.abono).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export { ReceiptTotal };