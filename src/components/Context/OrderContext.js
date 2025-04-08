import React from "react";
import { MenuContext } from "./MenuContext";
import { DataContext } from "./DataContext";
import { useGetData } from "../Hooks/useGetData";

const OrderContext = React.createContext();

function OrderProvider({ children }) {
  const { menuOption, apiBaseUrl } = React.useContext(MenuContext);
  const { registerId, isNew } = React.useContext(DataContext);

  let url = isNew ? apiBaseUrl : `${menuOption.url}/${registerId}`;
  const { data, isLoading } = useGetData(url);
  const currentDate = new Date().toISOString().split("T")[0];

  const [order, setOrder] = React.useState({
    clientId: '',
    orderDate: currentDate,
    state: 'Pendiente'
  });
  const [orderTotals, setOrderTotals] = React.useState({
    totalSell: 0,
    totalCost: 0,
    profit: 0,
    quantity: 0,
    items: 0
  });
  const [productList, setProductList] = React.useState([]);
  const [originalProductList, setOriginalProductList] = React.useState([]);

  React.useEffect(() => {
    if (!isNew) {
      if (data) {
        setOrder(data);
      }
    }
  }, [data]);

  return (
    <OrderContext.Provider value={{
      isLoading,
      order, setOrder,
      orderTotals, setOrderTotals,
      productList, setProductList,
      originalProductList, setOriginalProductList
    }}>
      {children}
    </OrderContext.Provider>
  )
}

export { OrderContext, OrderProvider };