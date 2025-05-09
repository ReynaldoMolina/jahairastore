'use client'

import { useState, useContext } from "react";
import Search from "@/app/ui/actiontools/search.svg";
import Backspace from "@/app/ui/actiontools/backspace.svg";
import Add from "@/app/ui/actiontools/add.svg";
import Filter from "@/app/ui/actiontools/filter.svg";
import FilterOff from "@/app/ui/actiontools/filteroff.svg";

const actionButtonStyle = "flex justify-center items-center w-full max-w-10 h-10 bg-sky-200 dark:bg-neutral-700 rounded-xl cursor-pointer border-none shadow-sm hover:bg-sky-300/70 dark:hover:bg-neutral-600 active:bg-sky-300 dark:active:bg-neutral-500";

export default function ActionTools({ allowNew = true }) {
  // const { searchValue, setSearchValue, setOpenModal, setRegisterId, setIsNew, setLoadAll } = useContext(DataContext);
  const [filter, setFilter] = useState(true);
  
  return (
    <div className="flex justify-center items-center gap-1">
      <search className="flex justify-center items-center w-full relative">
        <Search className="flex size-5 absolute left-3 stroke-2" />
        <input
          type="search"
          id="search-bar"
          className="action-icon bg-white dark:bg-neutral-700 rounded-xl border-none h-10 pl-11 pr-1 w-full shadow-sm text-sm focus-within:outline-1 focus-within:outline-none dark:focus-within:outline-none"
          placeholder="Buscar"
          autoComplete="off"
          // value={searchValue}
          // onChange={(event) => setSearchValue(event.target.value)}
        >
        </input>
      </search>
      <button
        className={actionButtonStyle}
        // onClick={() => {
        //   if (searchValue !== '') {
        //     setSearchValue('');
        //   }
        // }}
      >
        <Backspace className="flex size-5" />
      </button>
      <button
        className={`${actionButtonStyle} ${allowNew || "hidden"}`}
        // onClick={() => {
        //   setRegisterId('');
        //   setIsNew(true);
        //   setOpenModal(true);
        // }}
      >
        <Add className="flex size-5" />
      </button>
      <button
        className={actionButtonStyle}
        // onClick={() => setLoadAll(state => !state)}
        onClick={() => setFilter(state => !state)}
      >
        {filter ? <Filter className="flex size-5" /> : <FilterOff className="flex size-5" />}
      </button>
    </div>
  )
}