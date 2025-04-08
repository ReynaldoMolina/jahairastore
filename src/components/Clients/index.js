import React from "react";
import { useGetData } from "../Hooks/useGetData";
import { ActionTools } from "../ActionTools";
import { Loading } from "../Loading";
import { EmptyList } from "../EmptyList";
import { ClientForm } from "../Clients/ClientForm";
import { useFilterData } from "../Hooks/useFilterData";
import "../styles/Registers.css";
import "./Clients.css";

function Clients({
  menuOption,
  openModal,
  setOpenModal,
  setRegisterId,
  setIsNew,
}) {
  const { data, isLoading } = useGetData(menuOption.url);
  const filteredData = useFilterData(data, menuOption.name);

  if (isLoading) return <Loading />;
  if (openModal) return <ClientForm />;

  return (
    <>
      <ActionTools />
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
              <span className="phone">{register.phone ? register.phone : '(Sin teléfono)'}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export { Clients };