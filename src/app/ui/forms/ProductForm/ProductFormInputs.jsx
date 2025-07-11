'use client';

import { useState } from 'react';
import {
  FormDiv,
  FormSpan,
  FormCheck,
  FormLabel,
} from '@/app/ui/forms/FormInputs/formInputs';
import { bgColors } from '@/app/ui/bgcolors';

export function ProductPrices({ isNew, product }) {
  const [precioNio, setPrecioNio] = useState(
    product.Cambio_dolar === null ? false : true
  );
  const [inventario, setInventario] = useState(product.Inventario);
  const [prices, setPrices] = useState({
    Cambio_dolar: product.Cambio_dolar || 37,
    Precio_venta: product.Precio_venta,
    Precio_venta_nio:
      Math.round(product.Precio_venta * product.Cambio_dolar * 100) / 100 || '',
    Precio_compra: product.Precio_compra,
    Precio_compra_nio:
      Math.round(product.Precio_compra * product.Cambio_dolar * 100) / 100 ||
      '',
  });
  const profitDol = prices.Precio_venta - prices.Precio_compra || 0;
  const profitNio = prices.Precio_venta_nio - prices.Precio_compra_nio || 0;

  return (
    <div className="flex flex-col gap-6 my-4">
      <FormDiv flexCol={false}>
        <FormCheck
          name="Inventario"
          holder="¿Agregar al inventario?"
          value={inventario}
          setValue={setInventario}
        />
        <FormCheck
          name="Precio_nio"
          holder="¿Precio en córdobas?"
          value={precioNio}
          setValue={setPrecioNio}
        />
      </FormDiv>
      {precioNio && (
        <>
          <FormCambioDolar
            name="Cambio_dolar"
            holder="Cambio dólar"
            value={prices}
            setValue={setPrices}
          />
          <FormDiv flexCol={false}>
            <FormInput
              name="Precio_compra_nio"
              holder="Compra C$"
              value={prices}
              setValue={setPrices}
              value2="Precio_compra"
              calculateVenta={true}
              color="red"
              focus={isNew}
            />
            <FormInput
              name="Precio_venta_nio"
              holder="Venta C$"
              value={prices}
              setValue={setPrices}
              value2="Precio_venta"
              color="green"
            />
            <FormSpan
              name="Ganancia C$"
              holder="Ganancia C$"
              value={profitNio}
              color="blue"
              type="number"
            />
          </FormDiv>
        </>
      )}
      <FormDiv flexCol={false}>
        <FormInput
          name="Precio_compra"
          holder="Compra $"
          value={prices}
          setValue={setPrices}
          value2="Precio_compra_nio"
          convertToNio={true}
          color="red"
          required={true}
        />
        <FormInput
          name="Precio_venta"
          holder="Venta $"
          value={prices}
          setValue={setPrices}
          value2="Precio_venta_nio"
          convertToNio={true}
          color="green"
          required={true}
        />
        <FormSpan
          name="Ganancia $"
          holder="Ganancia $"
          value={profitDol}
          setValue={setPrices}
          color="blue"
          type="number"
        />
      </FormDiv>
    </div>
  );
}

function FormInput({
  name,
  holder,
  value,
  value2,
  convertToNio = false,
  setValue,
  color,
  required = false,
  calculateVenta = false,
  focus = false,
}) {
  const bgColor = bgColors[color];

  function handleChange(event) {
    let newValue = {};
    const newValue2 = convertToNio
      ? event.target.value * value.Cambio_dolar
      : event.target.value / value.Cambio_dolar;

    if (!calculateVenta) {
      newValue = {
        ...value,
        [name]: event.target.value,
        [value2]: newValue2,
      };
    } else {
      const calculatedVenta = (event.target.value * 3) / 2;
      newValue = {
        ...value,
        [name]: event.target.value,
        [value2]: newValue2,
        Precio_venta_nio: calculatedVenta,
        Precio_venta: calculatedVenta / value.Cambio_dolar,
      };
    }

    setValue(newValue);
  }

  return (
    <div className="flex flex-col w-full gap-1">
      <FormLabel>{holder}</FormLabel>
      <input
        id={name}
        name={name}
        type="number"
        min={0}
        step="any"
        className={`flex ${bgColor} ${bgColors.borderColor} items-center rounded-lg text-xs h-9 px-3 w-full`}
        placeholder={holder}
        autoComplete="off"
        value={value[name]}
        onChange={(event) => handleChange(event)}
        required={required}
        autoFocus={focus}
      ></input>
    </div>
  );
}

function FormCambioDolar({ name, holder, value, setValue }) {
  return (
    <div className="flex flex-col w-full gap-1">
      <label htmlFor={name} className="w-full text-xs pl-2 font-semibold">
        {holder}
      </label>
      <input
        id={name}
        name={name}
        type="number"
        min={0}
        step="0.01"
        className={`flex ${bgColors.borderColor} items-center rounded-lg text-xs h-9 px-3 w-full`}
        placeholder={holder}
        autoComplete="off"
        value={value[name]}
        onChange={(event) => {
          const newValue = {
            ...value,
            [name]: event.target.value,
            Precio_venta: value.Precio_venta_nio / event.target.value,
            Precio_compra: value.Precio_compra_nio / event.target.value,
          };
          setValue(newValue);
        }}
        required
      ></input>
    </div>
  );
}
