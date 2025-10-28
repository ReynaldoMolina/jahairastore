'use client';

import { useState } from 'react';
import { useFormContext } from '../register';
import { formatNumber } from '@/lib/formatters';
import { FormLabel } from '../form-inputs/form-inputs';
import { Copy, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Restante({ order }) {
  const { formTotals } = useFormContext();

  const [restante, setRestante] = useState({
    Peso: order.Peso,
    Cambio_dolar: order.Cambio_dolar,
    Precio_libra: order.Precio_libra,
  });

  const saldo = formTotals.totalSell - order.TotalAbono;
  const orderPeso = isNaN(Number(restante.Peso)) ? 0 : Number(restante.Peso);
  const orderEnvio = orderPeso * Number(restante.Precio_libra);
  const ordereRestanteTotal = orderEnvio + saldo;
  const ordereRestanteTotalCordobas =
    ordereRestanteTotal * restante.Cambio_dolar;

  const message =
    `Hola ${order.Nombre}, ya está tu pedido listo para entregar 🥰.\n` +
    `El paquete pesó ${formatNumber(
      orderPeso
    )} libras, en dólares $${formatNumber(orderEnvio)}.\n` +
    `${
      saldo > 0
        ? `El restante es de $${formatNumber(
            saldo
          )}.\nEn total *$${formatNumber(
            ordereRestanteTotal
          )}* en córdobas *C$${formatNumber(ordereRestanteTotalCordobas)}* 🥰`
        : `En córdobas *C$${formatNumber(ordereRestanteTotalCordobas)}* 🥰`
    }`;

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
    <section className={`flex flex-col gap-3 items-center`}>
      <div className="flex gap-1 md:gap-3 w-full items-end">
        <FormInput
          name="Peso"
          holder="Peso"
          value={restante}
          setValue={setRestante}
        />
        <FormInput
          name="Cambio_dolar"
          holder="Cambio USD"
          value={restante}
          setValue={setRestante}
        />
        <FormInput
          name="Precio_libra"
          holder="Precio libra"
          value={restante}
          setValue={setRestante}
        />
      </div>
      <div className="flex flex-col p-2 rounded-lg bg-green-200 dark:bg-green-800 w-full shadow">
        <p className="text-xs text-center">{`Hola ${order.Nombre}, ya está tu pedido listo para entregar 🥰.`}</p>
        <p className="text-xs text-center">{`El paquete pesó ${formatNumber(
          orderPeso
        )} libras, en dólares $${formatNumber(orderEnvio)}.`}</p>

        {saldo > 0 && (
          <p className="text-xs text-center">{`El restante es de $${formatNumber(
            saldo
          )}.`}</p>
        )}

        {saldo > 0 ? (
          <p className="text-xs text-center">{`En total $${formatNumber(
            ordereRestanteTotal
          )}, en córdobas C$${formatNumber(
            ordereRestanteTotalCordobas
          )} 🥰`}</p>
        ) : (
          <p className="text-xs text-center">{`En córdobas C$${formatNumber(
            ordereRestanteTotalCordobas
          )} 🥰`}</p>
        )}
      </div>
      <div className="flex gap-2">
        <FormOption label="Copiar" action={handleCopyToClipboard}>
          <Copy />
        </FormOption>
        {order.Telefono && (
          <WhatsAppButton
            message={message}
            phoneNumber={order.Telefono}
            label="Enviar"
          >
            <MessageCircle className="size-4 text-black" />
          </WhatsAppButton>
        )}
      </div>
    </section>
  );
}

function FormInput({ name, holder, value, setValue }) {
  return (
    <div className="flex flex-col w-full gap-3">
      <FormLabel name={name}>
        <span>{holder}</span>
      </FormLabel>
      <input
        id={name}
        name={name}
        type="number"
        min={0}
        step="0.001"
        className="flex border items-center rounded-lg text-xs h-9 px-3 w-full"
        placeholder={holder}
        autoComplete="off"
        value={value[name]}
        onChange={(event) => {
          const newValue = {
            ...value,
            [name]: event.target.value,
          };
          setValue(newValue);
        }}
        required={true}
      ></input>
    </div>
  );
}

function FormOption({ label, children, action }) {
  return (
    <Button type="button" onClick={action}>
      {children}
      {label}
    </Button>
  );
}

function WhatsAppButton({ children, message, phoneNumber, label }) {
  const encodedMessage = encodeURIComponent(message);
  const formattedPhoneNumber = phoneNumber.replace(/\D/g, '');
  const whatsAppUrl = `https://api.whatsapp.com/send?phone=${formattedPhoneNumber}&text=${encodedMessage}`;

  return (
    <Button type="button" asChild>
      <Link href={whatsAppUrl} target="_blank" rel="noopener noreferrer">
        {children}
        <label className="text-xs text-black">{label}</label>
      </Link>
    </Button>
  );
}
