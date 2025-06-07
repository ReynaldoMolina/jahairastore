'use client';

import { useState } from "react";
import { useFormContext } from "../forms/RegisterForm";
import CopyIcon from "@/app/ui/icons/copy.svg";
import WhatsAppIcon from "@/app/ui/icons/whatsapp.svg";

export function Restante({ order }) {
  const { formTotals } = useFormContext();

  const [restante, setRestante] = useState({
    Peso: order.Peso,
    Cambio_dolar: order.Cambio_dolar,
    Precio_libra: order.Precio_libra
  });

  const saldo = (formTotals.totalSell - order.TotalAbono);
  const orderPeso = isNaN(Number(restante.Peso)) ? 0 : Number(restante.Peso);
  const orderEnvio = orderPeso * Number(restante.Precio_libra);
  const ordereRestanteTotal = orderEnvio + saldo;
  const ordereRestanteTotalCordobas = ordereRestanteTotal * restante.Cambio_dolar;

  const message =
    `Hola ${order.Nombre}, ya está tu pedido listo para entregar 🥰.\n` +
    `El paquete pesó ${orderPeso.toFixed(3)} libras, en dólares $${orderEnvio.toFixed(2)}.\n` +
    `${saldo > 0 ? `El restante es de $${saldo.toFixed(2)}.\nEn total *$${ordereRestanteTotal.toFixed(2)}*, en córdobas *C$${ordereRestanteTotalCordobas.toFixed(2)}* 🥰` : `En córdobas *C$${ordereRestanteTotalCordobas.toFixed(2)}* 🥰`}`;

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message);
      alert('Texto copiado al portapapeles');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('No se pudo copiar el texto al portapapeles');
    }
  };

  return (
    <section className="flex flex-col gap-2 bg-neutral-100 dark:bg-neutral-900 rounded-xl p-2">
      <p className="text-sm font-semibold px-2">Por cobrar</p>
      <div className="flex flex-col gap-3 items-center">
        <div className="flex gap-3 w-full">
          <FormInput name="Peso" holder="Peso" type="number" value={restante} setValue={setRestante} />
          <FormInput name="Cambio_dolar" holder="Cambio dólar" type="number" value={restante} setValue={setRestante} />
          <FormInput name="Precio_libra" holder="Precio libra" type="number" value={restante} setValue={setRestante} />
        </div>
        <div className="flex flex-col p-2 rounded-xl bg-green-200 dark:bg-green-800 w-full">
          <p className="text-xs text-center">{`Hola ${order.Nombre}, ya está tu pedido listo para entregar 🥰.`}</p>
          <p className="text-xs text-center">{`El paquete pesó ${orderPeso.toFixed(3)} libras, en dólares $${orderEnvio.toFixed(2)}.`}</p>

          {saldo > 0 && <p className="text-xs text-center">{`El restante es de $${saldo.toFixed(2)}.`}</p> }

          {saldo > 0 ?
            <p className="text-xs text-center">{`En total $${ordereRestanteTotal.toFixed(2)}, en córdobas C$${ordereRestanteTotalCordobas.toFixed(2)} 🥰`}</p>
            :
            <p className="text-xs text-center">{`En córdobas C$${ordereRestanteTotalCordobas.toFixed(2)} 🥰`}</p>
          }
        </div>
        <div className="flex gap-2">
          <FormOption
            label="Copiar"
            action={handleCopyToClipboard}
          >
            <CopyIcon className="size-5" />
          </FormOption>
          {order.Telefono && (
            <WhatsAppButton
              message={message}
              phoneNumber={order.Telefono}
              label="Enviar">
              <WhatsAppIcon className="size-5" />
            </WhatsAppButton>
          )}
        </div>
      </div>
    </section>
  );
}

function FormInput({ name, holder, value, setValue, color = "bg-white dark:bg-neutral-700" }) {
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
        step="0.001"
        className={`flex ${color} items-center rounded-xl shadow-sm text-xs h-8 px-3 w-full`}
        placeholder={holder}
        autoComplete="off"
        value={value[name]}
        onChange={(event) => {
          const newValue = {
            ...value,
            [name]: event.target.value
          }
          setValue(newValue);
        }}
        required={true}
      ></input>
    </div>
  )
}

function FormOption({ label, children, action }) {
  return (
    <button
      className="flex justify-center items-center bg-sky-200 rounded-xl px-3 py-2 cursor-pointer shadow-xs gap-2"
      type="button"
      onClick={action}>
      {children}
      <label className="text-xs font-semibold text-black cursor-pointer">
        {label}
      </label>
    </button>
  )
}

function WhatsAppButton({ children, message, phoneNumber, label }) {
  const encodedMessage = encodeURIComponent(message);
  const formattedPhoneNumber = phoneNumber.replace(/\D/g, '');
  const whatsAppUrl = `https://api.whatsapp.com/send?phone=${formattedPhoneNumber}&text=${encodedMessage}`;

  return (
    <a
      href={whatsAppUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex justify-center items-center bg-sky-200 rounded-xl p-2 cursor-pointer shadow-xs gap-2">
      {children}
      <label className="text-xs font-semibold text-black cursor-pointer">
        {label}
      </label>
    </a>
  );
}