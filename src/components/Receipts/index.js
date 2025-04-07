import React from "react";
import { MenuContext } from "../Context/MenuContext";
import { DataContext } from "../Context/DataContext";
import { OrderProvider } from "../Context/OrderContext";
import { useGetData } from "../Hooks/useGetData";
import { ActionTools } from "../ActionTools";
import { ReceiptForm } from "../Receipts/ReceiptForm";
import { Loading } from "../Loading";
import { EmptyList } from "../EmptyList";
import { ReceiptTotal } from "./ReceiptTotal/ReceiptTotal";
import { useFilterData } from "../Hooks/useFilterData";
import "../styles/Registers.css";
import "./Receipts.css";

function Receipts() {
  const { menuOption } = React.useContext(MenuContext);
  const {
    openModal, setOpenModal, setRegisterId, setIsNew, loadAll
  } = React.useContext(DataContext);

  let url = '';
  if (!loadAll) {
    const currenDate = new Date().toISOString().split("T")[0];
    url = `${menuOption.url}?saleDate=${currenDate}`;
  } else {
    url = menuOption.url;
  };
  
  const { data, isLoading } = useGetData(url);
  const filteredData = useFilterData(data, menuOption.name);

  let abono;
  if (filteredData) {
    abono = filteredData.reduce((sum, item) => sum + item.abono, 0);
  }

  const receiptsGeneralTotal = {
    totalCount: filteredData.length,
    abono
  }

  if (isLoading) return <Loading />;
  
  return (
    <>
      {openModal || (
        <>
          <ActionTools allowNew={false}/>
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
                      <div className="flx">
                        <span className="date">{register.saleDate}</span>
                        <span className="total">{register.orderId}</span>
                        <span className="abono abono-receipt">{(register.abono).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          <div className="total-separator"></div>
          {filteredData.length > 0 && (<ReceiptTotal receiptsGeneralTotal={receiptsGeneralTotal}/>)}
        </>
      )}
      {openModal && (
        <OrderProvider>
          <ReceiptForm/>
        </OrderProvider>
      )}
    </>
  )
}

export { Receipts };