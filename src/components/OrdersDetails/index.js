import React from "react";
import { baseUrl } from "../urls/menuOptionsList";
import { DataContext } from "../Context/DataContext";
import { OrderContext } from "../Context/OrderContext";
import { useGetData } from "../Hooks/useGetData";
import { ProductSearch } from "../ProductSearch";
import { ProductCard } from "../ProductCard";
import { ProductCardEmpty } from "../ProductCard/ProductCardEmpty";
import { getOrderTotals } from "../Hooks/getOrderTotals";
import "./OrdersDetails.css";

function OrdersDetails() {
  console.log('Render OrdersDetails');
  const { isNew } = React.useContext(DataContext);
  const {
    order,
    productList, setProductList,
    setOriginalProductList,
    setOrderTotals
  } = React.useContext(OrderContext);

  const [isSearchProductOpen, setIsSearchProductOpen] = React.useState(false);

  console.log('productList', productList);

  React.useEffect(() => {
    console.log('useEffect detail');
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
      <h2 className="detail-title">Añadir productos</h2>
      <ProductSearch isSearchProductOpen={isSearchProductOpen} setIsSearchProductOpen={setIsSearchProductOpen}/>

      <h2 className="detail-title">Detalle del pedido</h2>
      <div className="flx flx-col details-list">
        {productList.length === 0 ? <ProductCardEmpty/> :
          productList.map(product => (
            <ProductCard product={product} />
          ))
        }
      </div>
    </>
  )
}

export { OrdersDetails };