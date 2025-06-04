'use client';

import { useState } from "react";

export function ProductPrices({ product }) {  
  const [precioNio, setPrecioNio] = useState(product.Cambio_dolar === null ? false : true);
  const [inventario, setInventario] = useState(product.Inventario);
  const [prices, setPrices] = useState({
    Precio_venta: product.Precio_venta,
    Precio_venta_nio: (product.Precio_venta * product.Cambio_dolar) || 0,
    Precio_compra: product.Precio_compra,
    Precio_compra_nio: (product.Precio_compra * product.Cambio_dolar) || 0,
    Cambio_dolar: product.Cambio_dolar || 1,
  });
  const profitDol = (prices.Precio_venta - prices.Precio_compra) || 0;
  const profitNio = (prices.Precio_venta_nio - prices.Precio_compra_nio) || 0;

  return (
    <div className="flex flex-col gap-4 my-4">
      <ProductDiv>
        <FormCheck name="Inventario" holder="¿Agregar al inventario?" value={inventario} setValue={setInventario} />
        <FormCheck name="Precio_nio" holder="¿Precio en córdobas?" value={precioNio} setValue={setPrecioNio} />
      </ProductDiv>
      {precioNio && (
        <FormInputDolar name="Cambio_dolar" holder="Cambio dólar" value={prices} setValue={setPrices} />
      )}
      <ProductDiv>
        <FormInput name="Precio_venta" holder="Venta $" value={prices} setValue={setPrices} value2="Precio_venta_nio" convertToNio={true} color="bg-green-100 dark:bg-green-900" required={true} />
        <FormInput name="Precio_compra" holder="Compra $" value={prices} setValue={setPrices} value2="Precio_compra_nio" convertToNio={true} color="bg-red-100 dark:bg-red-900" required={true} />
        <FormSpan name="Ganancia $" holder="Ganancia $" value={profitDol} setValue={setPrices} color="bg-blue-100 dark:bg-blue-900" />
      </ProductDiv>
      {precioNio && (
        <ProductDiv>
          <FormInput name="Precio_venta_nio" holder="Venta C$" value={prices} setValue={setPrices} value2="Precio_venta" color="bg-green-100 dark:bg-green-900" />
          <FormInput name="Precio_compra_nio" holder="Compra C$" value={prices} setValue={setPrices} value2="Precio_compra" color="bg-red-100 dark:bg-red-900" />
          <FormSpan name="Ganancia C$" holder="Ganancia C$" value={profitNio} color="bg-blue-100 dark:bg-blue-900" />
        </ProductDiv>
      )}
    </div>
  );
}

export function ProductDiv({ children }) {
  return (
    <div className="flex w-full items-end gap-3">
      {children}
    </div>
  );
}

function FormInput({ name, holder, value, value2, convertToNio = false, setValue, color = "bg-gray-100 dark:bg-neutral-700" }, required = false ) {
  return (
    <div className="flex flex-col w-full gap-1">
      <label
        htmlFor={name}
        className="w-full text-xs pl-2 font-semibold"
      >
        {holder}
      </label>
      <input
        id={name}
        name={name}
        type="number"
        min={0}
        step="any"
        className={`flex ${color} items-center rounded-xl shadow-sm text-xs h-8 px-3 w-full`}
        placeholder={holder}
        autoComplete='off'
        value={value[name]}
        onChange={(event) => {
          const newValue2 = convertToNio ? (event.target.value * value.Cambio_dolar) : (event.target.value / value.Cambio_dolar);
          const newValue = {
            ...value,
            [name]: event.target.value,
            [value2]: newValue2,
          };
          setValue(newValue);
        }}
        required={required}
      ></input>
    </div>
  )
}

function FormInputDolar({ name, holder, value, setValue }) {
  return (
    <div className="flex flex-col w-full gap-1">
      <label
        htmlFor={name}
        className="w-full text-xs pl-2 font-semibold"
      >
        {holder}
      </label>
      <input
        id={name}
        name={name}
        type="number"
        min={0}
        step="0.01"
        className="flex bg-gray-100 dark:bg-neutral-700 items-center rounded-xl shadow-sm text-xs h-8 px-3 w-full"
        placeholder={holder}
        autoComplete='off'
        value={value[name]}
        onChange={(event) => {
          const newValue = {
            ...value,
            [name]: event.target.value,
            Precio_venta: (value.Precio_venta_nio / event.target.value),
            Precio_compra: (value.Precio_compra_nio / event.target.value),
          };
          setValue(newValue);
        }}
        required
      ></input>
    </div>
  )
}

function FormSpan({ name, holder, value, color = "bg-gray-100 dark:bg-neutral-700 " }) {
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
        className={`flex ${color} items-center rounded-xl shadow-sm text-xs h-8 px-3 w-full`}
      >
        {value.toFixed(2)}
      </span>
    </div>
  )
}

function FormCheck({ name, holder, value, setValue }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label
        htmlFor={name}
        className="w-full text-xs text-center font-semibold"
      >
        {holder}
      </label>
      <input
        name={name}
        id={name}
        className="h-8"
        type="checkbox"
        checked={value}
        onChange={() => setValue(state => !state)}
      ></input>
    </div>
  );
}