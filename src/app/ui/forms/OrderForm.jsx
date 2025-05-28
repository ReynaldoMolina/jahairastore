'use client';

import { useState, createContext, useContext } from "react";
import Link from "next/link";
import getDate from "@/app/lib/getDate";
import getOrderTotals from "@/app/lib/getOrderTotals";
import ArrowDown from "@/app/ui/orderForm/arrowdown.svg";
import SearchInput from "@/app/ui/actiontools/SearchInput";
import { createOrder, updateOrder } from "@/app/lib/actions";

const OrderContext = createContext();

export function useOrder() {
  const context = useContext(OrderContext);
  return context;
}

export function OrderCreate({ children }) {
  const [productList, setProductList] = useState([]);
  const [orderTotals, setOrderTotals] = useState(getOrderTotals(productList));

  function handleOrder(formData) {
    if (productList.length === 0) {
      alert("Agrega productos al pedido");
      return;
    }
    createOrder(formData, productList);
  }

  return (
    <form
      action={handleOrder}
      className="flex flex-col bg-white dark:bg-neutral-800 rounded-xl shadow-md gap-4 mx-auto max-w-170 p-3 w-full h-fit">
      <OrderContext.Provider value={{
        productList, setProductList,
        orderTotals, setOrderTotals
      }}>
        {children}
      </OrderContext.Provider>
    </form>
  );
}

export function OrderEdit({ children, orderId, orderdetail }) {
  const originalList = orderdetail;
  const [productList, setProductList] = useState(orderdetail);
  const [orderTotals, setOrderTotals] = useState(getOrderTotals(productList));

  function handleOrder(formData) {
    if (productList.length === 0) {
      alert("Agrega productos al pedido");
      return;
    }
    updateOrder(orderId, formData, productList, originalList);
  }

  return (
    <form
      action={handleOrder}
      className="flex flex-col bg-white dark:bg-neutral-800 rounded-xl shadow-md gap-4 mx-auto max-w-170 p-3 w-full h-fit">
      <OrderContext.Provider value={{
        productList, setProductList,
        orderTotals, setOrderTotals
      }}>
        {children}
      </OrderContext.Provider>
    </form>
  );
}

export function OrderInfo({ children, date, abono = 0 }) {
  return (
    <section className="flex flex-col gap-4">
      <OrderDate date={date} />
      {children}
      <OrderSubtotals abono={abono} />
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

function OrderDate({ date }) {
  const currentDate = getDate();
  const newDate = date === "" ? currentDate : date; 
  return (
    <div className="flex flex-col w-full gap-1">
      <label
        htmlFor="Fecha_del_pedido"
        className="w-full text-xs pl-2 font-semibold"
      >Fecha</label>
      <input
        id="Fecha_del_pedido"
        name="Fecha_del_pedido"
        type="date"
        className="flex bg-gray-100 dark:bg-neutral-700 items-center rounded-xl shadow-sm text-xs h-8 px-3 w-full"
        required
        defaultValue={newDate}
      ></input>
    </div>
  )
}

function OrderSubtotals({ abono }) {
  const { orderTotals } = useContext(OrderContext);
  return (
    <div className="flex w-full items-end gap-3">
      <OrderFormSpan name="OrderTotal" holder="Total" value={orderTotals.totalSell} type="number" color="bg-neutral-200 dark:bg-neutral-600"/>
      <OrderFormSpan name="OrderAbono" holder="Abono" value={abono} type="number" color="bg-green-200 dark:bg-green-900" />
      <OrderFormSpan name="Saldo" holder="Saldo" value={orderTotals.totalSell - abono} type="number"  color="bg-red-200 dark:bg-red-900" />
      <OrderFormSpan name="Profit" holder="Ganancia" value={orderTotals.totalSell - orderTotals.totalCost} type="number" color="bg-blue-200 dark:bg-blue-900" />
    </div>
  );
}

function OrderFormSpan({ name, holder, value, type = 'text', color = "bg-gray-100 dark:bg-neutral-700 " }) {
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

export function OrderFormButtons({ link, label }) {
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

