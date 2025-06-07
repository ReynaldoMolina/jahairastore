'use client';

import { useState, createContext, useContext } from "react";
import Link from "next/link";
import getDate from "@/app/lib/getDate";
import { getSaleTotals } from "@/app/lib/calculateTotals";
import ArrowDown from "@/app/ui/SaleForm/arrowdown.svg";
import SearchInput from "@/app/ui/actiontools/SearchInput";
import { createSale, updateSale } from "@/app/lib/actions";

const SaleContext = createContext();

export function useSale() {
  const context = useContext(SaleContext);
  return context;
}

export function SaleCreate({ children }) {
  const [productList, setProductList] = useState([]);
  const [saleTotals, setSaleTotals] = useState(getSaleTotals(productList));

  function handleSale(formData) {
    if (productList.length === 0) {
      alert("Agrega productos a la venta");
      return;
    }
    createSale(formData, productList);
  }

  return (
    <form
      action={handleSale}
      className="flex flex-col bg-white dark:bg-neutral-800 rounded-xl shadow-md gap-4 mx-auto max-w-170 p-3 w-full h-fit">
      <SaleContext.Provider value={{
        productList, setProductList,
        saleTotals, setSaleTotals
      }}>
        {children}
      </SaleContext.Provider>
    </form>
  );
}

export function SaleEdit({ children, saleId, saledetail }) {
  const originalList = saledetail;
  const [productList, setProductList] = useState(saledetail);
  const [saleTotals, setSaleTotals] = useState(getSaleTotals(productList));

  function handleSale(formData) {
    if (productList.length === 0) {
      alert("Agrega productos a la venta");
      return;
    }
    updateSale(saleId, formData, productList, originalList);
  }

  return (
    <form
      action={handleSale}
      className="flex flex-col bg-white dark:bg-neutral-800 rounded-xl shadow-md gap-4 mx-auto max-w-170 p-3 w-full h-fit">
      <SaleContext.Provider value={{
        productList, setProductList,
        saleTotals, setSaleTotals
      }}>
        {children}
      </SaleContext.Provider>
    </form>
  );
}

export function SaleInfo({ children, date, abono = 0 }) {
  return (
    <section className="flex flex-col gap-4">
      <SaleDate date={date} />
      {children}
      <SaleSubtotals />
    </section>
  );
}

export function ProductSearch({ children, open }) {
  const [isSearchProductOpen, setIsSearchProductOpen] = useState(open);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 bg-neutral-100 dark:bg-neutral-900 rounded-xl p-2">
        <div
          className="flex items-center justify-between gap-1 cursor-pointer"
          onClick={() => setIsSearchProductOpen(state => !state)}>
          <p className="text-sm font-semibold px-2">Agregar productos</p>
          <ArrowDown className={`rounded-xl w-10 h-6 shadow-xs bg-white dark:bg-neutral-700 ${isSearchProductOpen ? "rotate-180" : "rotate-0"}`} />
        </div>
        {isSearchProductOpen && <SearchInput />}
        {isSearchProductOpen && children}
      </div>
    </section>
  );
}

function SaleDate({ date }) {
  const currentDate = getDate();
  const newDate = date === "" ? currentDate : date; 
  return (
    <div className="flex flex-col w-full gap-1">
      <label
        htmlFor="Fecha"
        className="w-full text-xs pl-2 font-semibold"
      >Fecha</label>
      <input
        id="Fecha"
        name="Fecha"
        type="date"
        className="flex bg-gray-100 dark:bg-neutral-700 items-center rounded-xl shadow-sm text-xs h-8 px-3 w-full"
        required
        defaultValue={newDate}
      ></input>
    </div>
  )
}

function SaleSubtotals() {
  const { saleTotals } = useContext(SaleContext);
  return (
    <div className="flex w-full items-end gap-3">
      <SaleFormSpan name="SaleVenta" holder="Total venta" value={saleTotals.totalSell} type="number" color="bg-green-200 dark:bg-green-900"/>
      <SaleFormSpan name="SaleCompra" holder="Total costo" value={saleTotals.totalCost} type="number" color="bg-red-200 dark:bg-red-900" />
      <SaleFormSpan name="Profit" holder="Ganancia" value={saleTotals.totalSell - saleTotals.totalCost} type="number" color="bg-blue-200 dark:bg-blue-900" />
    </div>
  );
}

function SaleFormSpan({ name, holder, value, type = 'text', color = "bg-gray-100 dark:bg-neutral-700 " }) {
  return (
    <div className="flex flex-col w-full gap-1">
      <label
        htmlFor={name}
        className="w-full text-xs pl-2 font-semibold"
      >
        {holder}
      </label>
      <span
        name={name}
        id={name}
        className={`flex ${color} items-center rounded-xl shadow-sm text-xs h-8 px-3 w-full ${type === 'number' ? 'justify-end' : 'justify-start'}`}
      >
        {type === 'text' ? value : value.toFixed(2)}
      </span>
    </div>
  )
}

export function SaleFormButtons({ link, label }) {
  return (
    <div className="flex w-full justify-center gap-3">
      <Link
        href={link}
        className="flex items-center justify-center rounded-xl font-semibold cursor-pointer h-9 w-full sm:w-35 bg-red-500 text-xs text-white"
      >Cancelar</Link>
      <button
        type="submit"
        value="Save"
        className="flex items-center justify-center rounded-xl font-semibold cursor-pointer h-9 w-full sm:w-35 bg-green-600 text-xs text-white"
      >{label}</button>
    </div>
  )
}

