import React from "react";
import { MenuContext } from "../Context/MenuContext";
import { DataContext } from "../Context/DataContext";
import { OrderProvider } from "../Context/OrderContext";
import { Loading } from "../Loading";
import { useGetData } from "../Hooks/useGetData";
import { ActionTools } from "../ActionTools";
import { OrderForm } from "../Orders/OrderForm";
import { useFilterData } from "../Hooks/useFilterData";
import { EmptyList } from "../EmptyList";
import { OrderTotal } from "./OrderTotal/OrderTotal";
import "../styles/Registers.css";
import "./Orders.css";

function Orders() {
  const { menuOption } = React.useContext(MenuContext);
  const {
    openModal, setOpenModal, setRegisterId, setIsNew, loadAll
  } = React.useContext(DataContext);

  let totalSell, abonos, saldo, profit, url;

  if (!loadAll) {
    url = `${menuOption.url}?debe=true`;
  } else {
    url = menuOption.url;
  };

  const { data, isLoading } = useGetData(url);
  const filteredData = useFilterData(data, menuOption.name);

  if (filteredData) {
    totalSell = filteredData.reduce((sum, item) => sum + item.totalSell, 0);
    abonos = filteredData.reduce((sum, item) => sum + item.abonos, 0);
    saldo = filteredData.reduce((sum, item) => sum + item.saldo, 0);
    profit = filteredData.reduce((sum, item) => sum + item.profit, 0);
  }

  const ordersGeneralTotal = {
    totalCount: filteredData.length,
    totalSell,
    abonos,
    saldo,
    profit
  }

  return (
    <>
      {openModal || (
        <>
          <ActionTools/>
          {isLoading && <Loading/>}
          {isLoading || (
            <div className="flx flx-col register-list">
              {filteredData.length === 0 && ( <EmptyList/> )}
              {filteredData.map(register => (
                <div
                  key={register.id}
                  className="flx register-card"
                  onClick={() => {
                    setRegisterId(register.id);
                    setIsNew(false);
                    setOpenModal(true);
                  }}
                >
                  <span className="flx flx-center id">{register.id}</span>
                  <div className="flx info">
                    <span className="name">{register.fullname}</span>
                    <span className="date">{register.orderDate}</span>
                    <div className="flx">
                        <span className="total">{(register.totalSell).toFixed(2)}</span>
                        <span className="abono">{(register.abonos).toFixed(2)}</span>
                        <span className="saldo">{(register.saldo).toFixed(2)}</span>
                        <span className="profit">{(register.profit).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="total-separator"></div>
          {filteredData.length > 0 && ( <OrderTotal ordersGeneralTotal={ordersGeneralTotal}/> )}
        </>
      )}
      {openModal && (
        <OrderProvider>
          <OrderForm/>
        </OrderProvider>
      )}
    </>
  )
}

export { Orders };