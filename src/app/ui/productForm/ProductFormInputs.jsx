'use client';

import { useState } from "react";
import { FormDiv, FormSpan, FormCheck } from "@/app/ui/forms/formInputsClient";
import { bgColors } from "@/app/ui/bgcolors";

export function ProductPrices({ product }) {  
  const [precioNio, setPrecioNio] = useState(product.Cambio_dolar === null ? false : true);
  const [inventario, setInventario] = useState(product.Inventario);
  const [prices, setPrices] = useState({
    Cambio_dolar: product.Cambio_dolar || 37,
    Precio_venta: product.Precio_venta,
    Precio_venta_nio: (product.Precio_venta * product.Cambio_dolar) || 0,
    Precio_compra: product.Precio_compra,
    Precio_compra_nio: (product.Precio_compra * product.Cambio_dolar) || 0,
  });
  const profitDol = (prices.Precio_venta - prices.Precio_compra) || 0;
  const profitNio = (prices.Precio_venta_nio - prices.Precio_compra_nio) || 0;

  return (
    <div className="flex flex-col gap-4 my-4">
      <FormDiv>
        <FormCheck name="Inventario" holder="¿Agregar al inventario?" value={inventario} setValue={setInventario} />
        <FormCheck name="Precio_nio" holder="¿Precio en córdobas?" value={precioNio} setValue={setPrecioNio} />
      </FormDiv>
      {precioNio && (
        <>
          <FormCambioDolar name="Cambio_dolar" holder="Cambio dólar" value={prices} setValue={setPrices} />
          <FormDiv>
            <FormInput name="Precio_venta_nio" holder="Venta C$" value={prices} setValue={setPrices} value2="Precio_venta" color="green" />
            <FormInput name="Precio_compra_nio" holder="Compra C$" value={prices} setValue={setPrices} value2="Precio_compra" calculateVenta={true} color="red" />
            <FormSpan name="Ganancia C$" holder="Ganancia C$" value={profitNio} color="blue" type="number" />
          </FormDiv>
        </>
      )}
      {/* {precioNio || ( */}
        <FormDiv>
          <FormInput name="Precio_venta" holder="Venta $" value={prices} setValue={setPrices} value2="Precio_venta_nio" convertToNio={true} color="green" required={true} />
          <FormInput name="Precio_compra" holder="Compra $" value={prices} setValue={setPrices} value2="Precio_compra_nio" convertToNio={true} color="red" required={true} />
          <FormSpan name="Ganancia $" holder="Ganancia $" value={profitDol} setValue={setPrices} color="blue" type="number" />
        </FormDiv>
      {/* )} */}
    </div>
  );
}

function FormInput({ name, holder, value, value2, convertToNio = false, setValue, color = "gray", required = false, calculateVenta = false }) {
  const bgColor = bgColors[color];

  function handleChange(event) {
    let newValue = {};
    const newValue2 = convertToNio ? (event.target.value * value.Cambio_dolar) : (event.target.value / value.Cambio_dolar);

    if (!calculateVenta) {
      newValue = {
        ...value,
        [name]: event.target.value,
        [value2]: newValue2,
      };
    } else {
      const calculatedVenta = ((event.target.value * 3) / 2);
      newValue = {
        ...value,
        [name]: event.target.value,
        [value2]: newValue2,
        Precio_venta_nio: calculatedVenta,
        Precio_venta: calculatedVenta / value.Cambio_dolar,
      }
    }

    setValue(newValue);
  }

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
        className={`flex ${bgColor} items-center rounded-xl shadow-sm text-xs h-8 px-3 w-full`}
        placeholder={holder}
        autoComplete='off'
        value={value[name]}
        onChange={(event) => handleChange(event)}
        required={required}
      ></input>
    </div>
  )
}

function FormCambioDolar({ name, holder, value, setValue }) {
  const bgColor = bgColors.gray;
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
        className={`flex ${bgColor} items-center rounded-xl shadow-sm text-xs h-8 px-3 w-full`}
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