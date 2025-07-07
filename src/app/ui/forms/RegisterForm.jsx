'use client';

import Link from 'next/link';
import { useState, createContext, useContext } from 'react';
import { calculateTotals } from '@/app/lib/calculateTotals';
import {
  FormContainer,
  FormSpan,
  FormDate,
} from '@/app/ui/forms/FormInputs/formInputs';
import ArrowDown from '@/app/ui/icons/arrowdown.svg';
import SearchInput from '@/app/ui/actiontools/SearchInput';
import { bgColors } from '../bgcolors';

const FormContext = createContext();
export function useFormContext() {
  const context = useContext(FormContext);
  return context;
}

export function FormCreate({ children, createRegister, convert = false }) {
  const [productList, setProductList] = useState([]);
  const totals = convert
    ? calculateTotals(productList, convert)
    : calculateTotals(productList);
  const [formTotals, setFormTotals] = useState(totals);
  const [formAbono, setFormAbono] = useState(0);

  function handleRegister(formData) {
    if (productList.length === 0) {
      alert('Agrega productos a la lista');
      return;
    }
    createRegister(formData, productList);
  }

  return (
    <FormContainer action={handleRegister} wider={true}>
      <FormContext.Provider
        value={{
          productList,
          setProductList,
          formTotals,
          setFormTotals,
          formAbono,
          setFormAbono,
        }}
      >
        {children}
      </FormContext.Provider>
    </FormContainer>
  );
}

export function FormEdit({
  children,
  updateRegister,
  registerId,
  detailList,
  convert = false,
  allowEmpty = false,
  abono = 0,
}) {
  const originalList = detailList;
  const [productList, setProductList] = useState(detailList);
  const totals = convert
    ? calculateTotals(productList, convert)
    : calculateTotals(productList);
  const [formTotals, setFormTotals] = useState(totals);
  const [formAbono, setFormAbono] = useState(abono);

  function handleOrder(formData) {
    if (!allowEmpty && productList.length === 0) {
      alert('Agrega productos a la lista');
      return;
    }
    updateRegister(registerId, formData, productList, originalList);
  }

  return (
    <FormContainer action={handleOrder} wider={true}>
      <FormContext.Provider
        value={{
          productList,
          setProductList,
          formTotals,
          setFormTotals,
          formAbono,
          setFormAbono,
        }}
      >
        {children}
      </FormContext.Provider>
    </FormContainer>
  );
}

export function FormInfo({ children, date, value = 0, register }) {
  const formSubtotals = {
    orders: <OrderSubtotals abono={value} />,
    purchases: <PurchaseSubtotals gastos={value} />,
    sales: <SaleSubtotals abono={value} />,
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4">
        {children}
        <FormDate date={date} />
      </div>
      {formSubtotals[register]}
    </section>
  );
}

export function ProductSearch({ children, open }) {
  const [isSearchProductOpen, setIsSearchProductOpen] = useState(open);

  return (
    <section
      className={`flex flex-col gap-4 bg-neutral-100 dark:bg-black ${bgColors.borderColor} rounded-lg p-2 my-4`}
    >
      <div
        className="flex items-center justify-between gap-1 cursor-pointer"
        onClick={() => setIsSearchProductOpen((state) => !state)}
      >
        <p className="text-sm font-semibold">Agregar productos</p>
        <ArrowDown
          className={`rounded-md w-10 h-6 bg-white dark:bg-neutral-700 ${
            isSearchProductOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </div>
      {isSearchProductOpen && <SearchInput allowNew={false} />}
      {isSearchProductOpen && children}
    </section>
  );
}

function SubtotalsDiv({ children }) {
  return <div className="flex w-full items-end gap-1 md:gap-3">{children}</div>;
}

function OrderSubtotals({ abono }) {
  const { formTotals } = useContext(FormContext);
  return (
    <SubtotalsDiv>
      <FormSpan
        name="OrderTotal"
        holder="Total"
        value={formTotals.totalSell}
        color="gray"
      />
      <FormSpan name="OrderAbono" holder="Abono" value={abono} color="green" />
      <FormSpan
        name="Saldo"
        holder="Saldo"
        value={formTotals.totalSell - abono}
        color="red"
      />
      <FormSpan
        name="Profit"
        holder="Ganancia"
        value={formTotals.totalSell - formTotals.totalCost}
        type="number"
        color="blue"
      />
    </SubtotalsDiv>
  );
}

function PurchaseSubtotals({ gastos }) {
  const { formTotals } = useContext(FormContext);
  const profit = formTotals.totalSell - formTotals.totalCost - gastos;
  return (
    <SubtotalsDiv>
      <FormSpan
        name="PurchaseTotalVenta"
        holder="Venta"
        value={formTotals.totalSell}
        color="green"
      />
      <FormSpan
        name="PurchaseTotalCompra"
        holder="Compra"
        value={formTotals.totalCost}
        color="red"
      />
      {gastos > 0 && (
        <FormSpan
          name="PurchaseGastos"
          holder="Gastos"
          value={gastos}
          color="amber"
        />
      )}
      <FormSpan name="Profit" holder="Ganancia" value={profit} color="blue" />
    </SubtotalsDiv>
  );
}

function SaleSubtotals() {
  const { formTotals, formAbono } = useContext(FormContext);
  const profit = formTotals.totalSell - formTotals.totalCost;
  return (
    <SubtotalsDiv>
      <FormSpan
        name="SaleTotal"
        holder="Total"
        value={formTotals.totalSell}
        type="number"
      />
      <FormSpan
        name="SaleAbono"
        holder="Abono"
        value={formAbono || 0}
        type="number"
        color="green"
      />
      <FormSpan
        name="SaleBalance"
        holder="Saldo"
        value={formTotals.totalSell - (formAbono || 0)}
        type="number"
        color="red"
      />
      <FormSpan
        name="Profit"
        holder="Ganancia"
        value={profit}
        type="number"
        color="blue"
      />
    </SubtotalsDiv>
  );
}
