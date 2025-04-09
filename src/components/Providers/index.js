import React from "react";
import { useGetData } from "../Hooks/useGetData";
import { ActionTools } from "../ActionTools";
import { Loading } from "../Loading";
import { ProviderForm } from "../Providers/ProviderForm";
import { useFilterData } from "../Hooks/useFilterData";
import { EmptyList } from "../EmptyList";
import "../styles/Registers.css";

function Providers({
  menuOption,
  openModal,
  setOpenModal,
  setRegisterId,
  setIsNew
 }) {
  const { data , isLoading} = useGetData(menuOption.url);
  const filteredData = useFilterData(data, menuOption.name);

  if (isLoading) return <Loading />;
  if (openModal) return <ProviderForm />;
  
  return (
    <>
      <ActionTools />
      <div className="flx flx-col register-list">
        {filteredData.length === 0 && <EmptyList/> }
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
              <span className="name">{register.company}</span>
              <span className="phone">{register.phone}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export { Providers };