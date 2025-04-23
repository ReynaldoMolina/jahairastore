import React from "react";
import { FormInput } from "../../../FormInput";
import { FormOption } from "../../../FormOption";
import { ReactComponent as SvgCopy } from './copy.svg';

function OrderRestante({ orderTotals, order, setOrder, isNew }) {
  const [orderRestante, setOrderRestante] = React.useState({
    cambioDolar: 37,
    precioLibra: 3
  });

  const saldo = (orderTotals.totalSell ? orderTotals.totalSell : 0) - (order.abonos ? order.abonos : 0);
  const orderPeso = isNaN(Number(order.weight)) ? 0 : Number(order.weight);
  const orderEnvio = orderPeso * Number(orderRestante.precioLibra);
  const ordereRestanteTotal = orderEnvio + saldo;
  const ordereRestanteTotalCordobas = ordereRestanteTotal * orderRestante.cambioDolar;

  const handleCopyToClipboard = async () => {
    const textToCopy = `Hola ${order.name}, ya está tu pedido listo para entregar 🥰.\n` +
                       `El paquete pesó ${orderPeso.toFixed(2)} libras, en dólares $${orderEnvio.toFixed(2)}.\n` +
                       `${saldo > 0 ? `El restante es de $${saldo.toFixed(2)}.\nEn total $${ordereRestanteTotal.toFixed(2)}, en córdobas C$${ordereRestanteTotalCordobas.toFixed(2)} 🥰` : `En córdobas C$${ordereRestanteTotalCordobas.toFixed(2)} 🥰`}`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      alert('Texto copiado al portapapeles!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('No se pudo copiar el texto al portapapeles.');
    }
  };

  if (isNew) return null;

  return (
    <div className="flx flx-col order-info-container">
      <h2 className="order-title">Mensaje de dinero restante</h2>
      <div className="flx flx-col order-restante">
        <div className="flx order-restante-input-div">
          <FormInput name="weight" holder="Peso" type="number" value={order} setValue={setOrder} />
          <FormInput name="cambioDolar" holder="Cambio dólar" type="number" value={orderRestante} setValue={setOrderRestante} />
          <FormInput name="precioLibra" holder="Precio libra" type="number" value={orderRestante} setValue={setOrderRestante} />
        </div>
        <div className="flx flx-col order-restante-mensaje">
          {/* <p>{message}</p> */}
          <p>{`Hola ${order.name}, ya está tu pedido listo para entregar 🥰.`}</p>
          <p>{`El paquete pesó ${orderPeso.toFixed(2)} libras, en dólares $${orderEnvio.toFixed(2)}.`}</p>

          {saldo > 0 && <p>{`El restante es de $${saldo.toFixed(2)}.`}</p> }

          {saldo > 0 ?
            <p>{`En total $${ordereRestanteTotal.toFixed(2)}, en córdobas C$${ordereRestanteTotalCordobas.toFixed(2)} 🥰`}</p>
            :
            <p>{`En córdobas C$${ordereRestanteTotalCordobas.toFixed(2)} 🥰`}</p>
          }
        </div>
        <FormOption
          label="Copiar"
          action={handleCopyToClipboard}
        >
          <SvgCopy className="register-option" />
        </FormOption>
      </div>
    </div>
  );
}

export { OrderRestante };