function OrderTotals({ orderTotals }) {
  return (
    <div className="flx flx-col order-info-container">
      <h2 className="order-title">Totales del pedido</h2>
      <div className="flx order-totals">
        <span className="flx flx-col flx-center order-totals-item">
          <label className="order-totals-label">Productos</label>
          {orderTotals.items}
        </span>
        <span className="flx flx-col flx-center order-totals-item">
          <label className="order-totals-label">Cantidad</label>
          {orderTotals.quantity}
        </span>
        <span className="flx flx-col flx-center order-totals-item">
          <label className="order-totals-label">Total venta</label>
          $ {orderTotals.totalSell.toFixed(2)}
        </span>
        <span className="flx flx-col flx-center order-totals-item">
          <label className="order-totals-label">Total costo</label>
          $ {orderTotals.totalCost.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

export { OrderTotals };