'use client';

import { bgColors } from '@/lib/bg-colors';
import { useState } from 'react';
import {
  FormDiv,
  FormCheck,
  FormSpan,
  FormLabel,
  FormSpanNew,
} from './form-inputs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FieldSeparator } from '@/components/ui/field';

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
  const profitNio =
    Number(prices.Precio_venta_nio) - Number(prices.Precio_compra_nio) || 0;

  return (
    <>
      <FormDiv>
        <FormCheck
          name="Inventario"
          holder="¿Agregar al inventario?"
          description="Se agregará a las listas de ventas y compras."
          value={inventario}
          setValue={setInventario}
        />
        <FormCheck
          name="Precio_nio"
          holder="¿Precio en córdobas?"
          description="Se mostrará el precio en córdobas en las listas."
          value={precioNio}
          setValue={setPrecioNio}
        />
      </FormDiv>

      <FieldSeparator />

      {precioNio && (
        <>
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
            <FormSpanNew
              name="Ganancia C$"
              holder="Ganancia C$"
              value={profitNio}
              color="blue"
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
        <FormSpanNew
          name="Ganancia $"
          holder="Ganancia $"
          value={profitDol}
          color="blue"
        />
      </FormDiv>
      <FormCambioDolar
        name="Cambio_dolar"
        holder="Cambio dólar"
        value={prices}
        setValue={setPrices}
      />
    </>
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
    <div className="flex flex-col w-full gap-3">
      <Label>{holder}</Label>
      <Input
        id={name}
        name={name}
        type="number"
        min={0}
        step="any"
        className={bgColor}
        placeholder={holder}
        autoComplete="off"
        value={value[name]}
        onChange={(event) => handleChange(event)}
        required={required}
        autoFocus={focus}
      ></Input>
    </div>
  );
}

function FormCambioDolar({ name, holder, value, setValue }) {
  return (
    <div className="flex flex-col w-full gap-3">
      <Label htmlFor={name}>{holder}</Label>
      <Input
        id={name}
        name={name}
        type="number"
        min={0}
        step="0.01"
        className="w-full"
        placeholder={holder}
        autoComplete="off"
        value={value[name]}
        onChange={(event) => {
          const newValue = {
            ...value,
            [name]: event.target.value,
            Precio_venta: value.Precio_venta_nio / Number(event.target.value),
            Precio_compra: value.Precio_compra_nio / Number(event.target.value),
          };
          setValue(newValue);
        }}
        required
      ></Input>
    </div>
  );
}
