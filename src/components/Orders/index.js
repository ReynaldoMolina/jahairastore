import React from "react";
import { OrderProvider } from "../Context/OrderContext";
import { ActionTools } from "../ActionTools";
import { Loading } from "../Loading";
import { useGetData } from "../Hooks/useGetData";
import { OrderForm } from "../Orders/OrderForm";
import { useFilterData } from "../Hooks/useFilterData";
import { EmptyList } from "../EmptyList";
import { EmptyListSome } from "../EmptyListSome";
import { OrderTotal } from "./OrderTotal/OrderTotal";
import "../styles/Registers.css";

function Orders({
  menuOption,
  openModal,
  setOpenModal,
  setRegisterId,
  setIsNew,
  loadAll
}) {

  let totalSell, abonos, saldo, profit;
  let url = !loadAll ? `${menuOption.url}?debe=true` : menuOption.url


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

  if (isLoading) return <Loading/>;
  if (openModal) return (
    <OrderProvider>
      <OrderForm />
    </OrderProvider>
  );

  const message = 'Solo se cargaron pedidos con saldo, da click al ícono de filtro para cargar todo';

  return (
    <>
      <ActionTools />
      <div className="flx flx-col register-list">
        {loadAll || <EmptyListSome message={message} />}
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
              <div className="flx info-detail">
                <span className="total">{(register.totalSell).toFixed(2)}</span>
                <span className="abono">{(register.abonos).toFixed(2)}</span>
                <span className="saldo">{(register.saldo).toFixed(2)}</span>
                <span className="profit">{(register.profit).toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredData.length > 0 && (
        <OrderTotal ordersGeneralTotal={ordersGeneralTotal}/>
      )}
    </>
  )
}

export { Orders };