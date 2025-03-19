import React from "react";
import { MenuContext } from "../Context/MenuContext";
import { DataContext } from "../Context/DataContext";
import { useGetData } from "../Hooks/useGetData";
import { Loading } from "../Loading";
import { ActionTools } from "../ActionTools";
import { ProviderForm } from "../Providers/ProviderForm";
import { useFilterData } from "../Hooks/useFilterData";
import { EmptyList } from "../EmptyList";
import "../styles/Registers.css";
import "./Providers.css";

function Providers() {
  console.log('Render Providers');
  const { menuOption } = React.useContext(MenuContext);
  const {
    openModal, setOpenModal, setRegisterId, setIsNew
  } = React.useContext(DataContext);
  const { data , isLoading} = useGetData(menuOption.url);
  const filteredData = useFilterData(data, menuOption.name);
  
  return (
    <>
      {openModal || (
        <>
          <ActionTools/>
          {isLoading && <Loading/>}
          {isLoading || (
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
                    <span className="phone">{register.phone ? register.phone : '(Sin teléfono)'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {openModal && (
        <ProviderForm/>
      )}
    </>
  )
}

export { Providers };