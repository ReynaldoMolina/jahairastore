'use client';

import { useState, createContext, useContext } from "react";
import OrderDetailList from "@/app/ui/orderForm/OrderDetailList";
import ArrowDown from "@/app/ui/orderForm/arrowdown.svg";
import getOrderTotals from "@/app/lib/getOrderTotals";

const OrderContext = createContext();

export function useOrder() {
  const context = useContext(OrderContext);
  return context;  
}

export default function OrderDetail({ children }) {
  const [isSearchProductOpen, setIsSearchProductOpen] = useState(false);
  const [productList, setProductList] = useState([]);
  const [orderTotals, setOrderTotals] = useState(getOrderTotals(productList));

  return (
    <>
      <div className="flex w-full items-end gap-3">
        <OrderFormSpan name="OrderTotal" holder="Total" value={orderTotals.totalSell} type="number" color="bg-neutral-200 dark:bg-neutral-600"/>
        <OrderFormSpan name="OrderAbono" holder="Abono" value={0} type="number" color="bg-green-200 dark:bg-green-900" />
        <OrderFormSpan name="Saldo" holder="Saldo" value={orderTotals.totalSell} type="number"  color="bg-red-200 dark:bg-red-900" />
        <OrderFormSpan name="Profit" holder="Ganancia" value={orderTotals.totalSell - orderTotals.totalCost} type="number" color="bg-blue-200 dark:bg-blue-900" />
      </div>

      <OrderContext.Provider value={{
        productList, setProductList, orderTotals, setOrderTotals
      }}>
        <div className="flex flex-col gap-2 bg-neutral-100 dark:bg-neutral-900 rounded-xl p-2">
          <div
            className="flex items-center justify-between gap-1 cursor-pointer"
            onClick={() => setIsSearchProductOpen(state => !state)}>
            <p className="text-sm font-semibold px-2">Agregar productos</p>
            <ArrowDown className={`rounded-xl w-10 h-6 bg-neutral-700 ${isSearchProductOpen ? "rotate-180" : "rotate-0"}`} />
          </div>
          {isSearchProductOpen && children}
        </div>

        <OrderDetailList />
      </OrderContext.Provider>
    </>
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