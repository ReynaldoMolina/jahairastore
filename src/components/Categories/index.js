import React from "react";
import { ActionTools } from "../ActionTools";
import { useGetData } from "../Hooks/useGetData";
import { Loading } from "../Loading";
import { CategoryForm } from "../Categories/CategoryForm";
import { EmptyList } from "../EmptyList";
import { useFilterData } from "../Hooks/useFilterData";
import "../styles/Registers.css";
import "./Categories.css";

function Categories({
  menuOption,
  openModal,
  setOpenModal,
  setRegisterId,
  setIsNew
}) {
  const { data, isLoading } = useGetData(menuOption.url);
  const filteredData = useFilterData(data, menuOption.name);

  if (isLoading) return <Loading />;
  if (openModal) return <CategoryForm />;

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
            <span className="name">{register.name}</span>
          </div>
        ))}
      </div>
    </>
  )
}

export { Categories };