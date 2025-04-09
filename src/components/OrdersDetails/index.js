import React from "react";
import { DataContext } from "../Context/DataContext";
import { OrderContext } from "../Context/OrderContext";
import { ProductSearch } from "../ProductSearch";
import { ProductCard } from "../ProductCard";
import { ProductCardEmpty } from "../ProductCard/ProductCardEmpty";
import { getOrderTotals } from "../Hooks/getOrderTotals";
import "./OrdersDetails.css";

function OrdersDetails() {
  const { isNew } = React.useContext(DataContext);
  const {
    order,
    productList, setProductList,
    setOriginalProductList,
    setOrderTotals
  } = React.useContext(OrderContext);

  const [isSearchProductOpen, setIsSearchProductOpen] = React.useState(false);

  React.useEffect(() => {
    if (!isNew) {
      if (order) {
        setProductList(order.orderdetail ? order.orderdetail : []);
        setOriginalProductList(order.orderdetail ? order.orderdetail : []);
        setOrderTotals(getOrderTotals(order.orderdetail ? order.orderdetail : []));
      }
    }
  }, [order]);

  return (
    <>
      <div className="flx flx-col order-info-container">
        <h2 className="order-title">Añadir productos</h2>
        <ProductSearch isSearchProductOpen={isSearchProductOpen} setIsSearchProductOpen={setIsSearchProductOpen}/>
      </div>

      <div className="flx flx-col order-info-container">
        <h2 className="order-title">Detalle</h2>
        <div className="flx flx-col details-list">
          {productList.length === 0 ? <ProductCardEmpty/> :
            productList.map(product => (
              <ProductCard product={product} />
            ))
          }
        </div>
      </div>
    </>
  )
}

export { OrdersDetails };