import React from "react";
import { useGetData } from "../Hooks/useGetData";
import { ActionTools } from "../ActionTools";
import { Loading } from "../Loading";
import { EmptyList } from "../EmptyList";
import { EmptyListSome } from "../EmptyListSome";
import { ProductForm } from "../Products/ProductForm";
import { useFilterData } from "../Hooks/useFilterData";
import "../styles/Registers.css";

function Products({
  menuOption,
  openModal,
  setOpenModal,
  setRegisterId,
  setIsNew,
  loadAll
}) {

  const currenDate = new Date().toISOString().split("T")[0];
  let url = !loadAll ? `${menuOption.url}?addedDate=${currenDate}` : menuOption.url;

  const { data, isLoading } = useGetData(url);
  const filteredData = useFilterData(data, menuOption.name);

  if (isLoading) return <Loading />;
  if (openModal) return <ProductForm />;

  const message = 'Solo se cargaron productos agregados hoy, da click al ícono de filtro para cargar todo';
  
  return (
    <>
      <ActionTools />
      <div className="flx flx-col register-list">
        {loadAll || <EmptyListSome message={message} />}
        {filteredData.length === 0 && <EmptyList/>}
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
              <span className="name">{register.name}</span>
                <div className="flx info-detail">
                  <span className="sell-price">{(register.sellPrice).toFixed(2)}</span>
                  <span className="cost-price">{(register.costPrice).toFixed(2)}</span>
                  <span className="profit">{(register.sellPrice - register.costPrice).toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export { Products };