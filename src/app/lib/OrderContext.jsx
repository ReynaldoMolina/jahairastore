'use client';

import { useState, createContext } from "react";
import getDate from "@/app/lib/getDate";
import getOrderTotals from "@/app/lib/getOrderTotals";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const currentDate = getDate();
  const [orderData, setOrderData] = useState({
    Fecha_del_pedido: currentDate,
    Id_cliente: 1,
  });
  const [productList, setProductList] = useState([]);
  const [orderTotals, setOrderTotals] = useState(getOrderTotals(productList));

  return (
    <OrderContext.Provider value={{
      productList, setProductList,
      orderTotals, setOrderTotals,
      orderData, setOrderData,
    }}>
      {children}
    </OrderContext.Provider>
  );
}
