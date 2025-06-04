'use client';

import { useState, createContext, useContext } from "react";
import Link from "next/link";
import getDate from "@/app/lib/getDate";
import { getPurchasesTotals } from "@/app/lib/getTotals";
import ArrowDown from "@/app/ui/orderForm/arrowdown.svg";
import SearchInput from "@/app/ui/actiontools/SearchInput";
import { createPurchase, updatePurchase } from "@/app/lib/actions";

const PurchaseContext = createContext();

export function usePurchase() {
  const context = useContext(PurchaseContext);
  return context;
}

export function PurchaseCreate({ children }) {
  const [productList, setProductList] = useState([]);
  const [purchaseTotals, setPurchaseTotals] = useState(getPurchasesTotals(productList));

  function handlePurchase(formData) {
    if (productList.length === 0) {
      alert("Agrega productos a la compra");
      return;
    }
    createPurchase(formData, productList);
  }

  return (
    <form
      action={handlePurchase}
      className="flex flex-col bg-white dark:bg-neutral-800 rounded-xl shadow-md gap-4 mx-auto max-w-170 p-3 w-full h-fit">
      <PurchaseContext.Provider value={{
        productList, setProductList,
        purchaseTotals, setPurchaseTotals
      }}>
        {children}
      </PurchaseContext.Provider>
    </form>
  );
}

export function PurchaseEdit({ children, purchaseId, purchasedetail }) {
  const originalList = purchasedetail;
  const [productList, setProductList] = useState(purchasedetail);
  const [purchaseTotals, setPurchaseTotals] = useState(getPurchasesTotals(productList));

  function handlePurchase(formData) {
    if (productList.length === 0) {
      alert("Agrega productos a la compra");
      return;
    }
    updatePurchase(purchaseId, formData, productList, originalList);
  }

  return (
    <form
      action={handlePurchase}
      className="flex flex-col bg-white dark:bg-neutral-800 rounded-xl shadow-md gap-4 mx-auto max-w-170 p-3 w-full h-fit">
      <PurchaseContext.Provider value={{
        productList, setProductList,
        purchaseTotals, setPurchaseTotals
      }}>
        {children}
      </PurchaseContext.Provider>
    </form>
  );
}

export function PurchaseInfo({ children, date, gastos = 0 }) {
  return (
    <section className="flex flex-col gap-4">
      <PurchaseDate date={date} />
      {children}
      <PurchaseSubtotals gastos={gastos} />
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

function PurchaseDate({ date }) {
  const currentDate = getDate();
  const newDate = date === "" ? currentDate : date; 
  return (
    <div className="flex flex-col w-full gap-1">
      <label
        htmlFor="Fecha_compra"
        className="w-full text-xs pl-2 font-semibold"
      >Fecha</label>
      <input
        id="Fecha_compra"
        name="Fecha_compra"
        type="date"
        className="flex bg-gray-100 dark:bg-neutral-700 items-center rounded-xl shadow-sm text-xs h-8 px-3 w-full"
        required
        defaultValue={newDate}
      ></input>
    </div>
  )
}

function PurchaseSubtotals({ gastos }) {
  const { purchaseTotals } = useContext(PurchaseContext);
  const profit = (purchaseTotals.totalSell - purchaseTotals.totalCost - gastos);
  return (
    <div className="flex w-full items-end gap-3">
      <PurchaseFormSpan name="PurchaseTotal" holder="Total venta" value={purchaseTotals.totalSell} type="number" color="bg-green-100 dark:bg-green-900"/>
      <PurchaseFormSpan name="PurchaseTotalCompra" holder="Total compra" value={purchaseTotals.totalCost} type="number" color="bg-red-100 dark:bg-red-900"/>
      <PurchaseFormSpan name="PurchaseGastos" holder="Gastos" value={gastos} type="number" color="bg-amber-100 dark:bg-amber-900"/>
      <PurchaseFormSpan name="Profit" holder="Ganancia" value={profit} type="number" color="bg-blue-100 dark:bg-blue-900" />
    </div>
  );
}

function PurchaseFormSpan({ name, holder, value, color = "bg-gray-100 dark:bg-neutral-700 " }) {
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
        className={`flex ${color} items-center rounded-xl shadow-sm text-xs h-8 px-3 w-full justify-end`}
      >
        {value.toFixed(2)}
      </span>
    </div>
  )
}

export function PurchaseFormButtons({ link, label }) {
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

