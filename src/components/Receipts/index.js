import React from "react";
import { OrderProvider } from "../Context/OrderContext";
import { useGetData } from "../Hooks/useGetData";
import { ReceiptForm } from "../Receipts/ReceiptForm";
import { ActionTools } from "../ActionTools";
import { Loading } from "../Loading";
import { EmptyList } from "../EmptyList";
import { EmptyListSome } from "../EmptyListSome";
import { ReceiptTotal } from "./ReceiptTotal/ReceiptTotal";
import { useFilterData } from "../Hooks/useFilterData";
import { getLocalDate } from "../Hooks/getLocalDate";
import "../styles/Registers.css";

function Receipts({
  menuOption,
  openModal,
  setOpenModal,
  setRegisterId,
  setIsNew,
  loadAll
}) {
  const currenDate = getLocalDate();
  let url = !loadAll ? `${menuOption.url}?saleDate=${currenDate}` : menuOption.url;
  const { data, isLoading } = useGetData(url);
  const filteredData = useFilterData(data, menuOption.name);
  let abono = filteredData ? filteredData.reduce((sum, item) => sum + item.abono, 0) : 0;

  const receiptsGeneralTotal = {
    totalCount: filteredData.length,
    abono
  }

  if (isLoading) return <Loading />;
  if (openModal) return (
    <OrderProvider>
      <ReceiptForm />
    </OrderProvider>
  );
  
  const message = 'Solo se cargaron recibos agregados hoy, da click al ícono de filtro para cargar todo';

  return (
    <>
      <ActionTools allowNew="false" />
      <div className="flx flx-col register-list">
        {loadAll || <EmptyListSome message={message} />}
        {(filteredData.length === 0) && ( <EmptyList/> )}
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
                <div className="flx info-detail">
                  <span className="date">{register.saleDate}</span>
                  <span className="order-no">{register.orderId}</span>
                  <span className="abono abono-receipt">{(register.abono).toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredData.length > 0 && (
        <ReceiptTotal receiptsGeneralTotal={receiptsGeneralTotal}/>
      )}
    </>
  )
}

export { Receipts };