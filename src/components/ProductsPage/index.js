import React from "react";
import { useGetData } from "../Hooks/useGetData";
import { ActionTools } from "../ActionTools";
import { Loading } from "../Loading";
import { EmptyList } from "../EmptyList";
import { ProductPageForm } from "../ProductsPage/ProductPageForm";
import { useFilterData } from "../Hooks/useFilterData";
import "../styles/Registers.css";

function ProductsPage({
  menuOption,
  openModal,
  setOpenModal,
  setRegisterId,
  setIsNew
}) {
  const { data, isLoading } = useGetData(menuOption.url);
  const filteredData = useFilterData(data, menuOption.name);

  if (isLoading) return <Loading />;
  if (openModal) return <ProductPageForm />;
  
  return (
    <>
      <ActionTools />
      <div className="flx flx-col register-list">
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
                <div className="flx">
                  <span className="sell-price">{(register.price).toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
};

export { ProductsPage };