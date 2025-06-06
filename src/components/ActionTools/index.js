import React from "react";
import add from "./add.svg";
import { ReactComponent as SvgSearch } from './search.svg';
import { DataContext } from "../Context/DataContext";
import filter from "./filter.svg";
import deleteinput from "./deleteinput.svg";
import "./ActionTools.css"

function ActionTools({ allowNew = true }) {
  const { searchValue, setSearchValue, setOpenModal, setRegisterId, setIsNew, setLoadAll } = React.useContext(DataContext);
  
  return (
    <div className="flx flx-center action-buttons">
      <search className="flx flx-center search">
        <SvgSearch className="flx search-icon" />
        <input
          type="search"
          id="search-bar"
          className="action-search action-icon"
          placeholder="Buscar"
          autoComplete="off"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        >
        </input>
      </search>
      <button
        className="flx flx-center action-btn"
        onClick={() => {
          if (searchValue !== '') {
            setSearchValue('');
          }
        }}>
        <img src={deleteinput} alt="Delete search"></img>
      </button>
      <button
        className={`flx flx-center action-btn ${allowNew || "hidden"}`}
        onClick={() => {
          setRegisterId('');
          setIsNew(true);
          setOpenModal(true);
        }}
      >
        <img src={add} alt="New"></img>
      </button>
      <button
        className="flx flx-center action-btn"
        onClick={() => setLoadAll(state => !state)}>
        <img src={filter} alt="Filter"></img>
      </button>
    </div>
  )
}

export { ActionTools };