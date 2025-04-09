import React from "react";
import { FormInput } from "../../../FormInput";

function OrderRestante({ orderTotals, order, isNew }) {
  const [orderRestante, setOrderRestante] = React.useState({
    peso: 0,
    cambioDolar: 37,
    precioLibra: 3
  });

  const saldo = (orderTotals.totalSell ? orderTotals.totalSell : 0) - (order.abonos ? order.abonos : 0);
  const orderPeso = isNaN(Number(orderRestante.peso)) ? 0 : Number(orderRestante.peso);
  const orderEnvio = orderPeso * Number(orderRestante.precioLibra);
  const ordereRestanteTotal = orderEnvio + saldo;
  const ordereRestanteTotalCordobas = ordereRestanteTotal * orderRestante.cambioDolar;

  if (isNew) return null;

  return (
    <div className="flx flx-col order-info-container">
      <h2 className="order-title">Mensaje de dinero restante</h2>
      <div className="flx flx-col order-restante">
        <div className="flx order-restante-input-div">
          <FormInput name="peso" holder="Peso" type="number" value={orderRestante} setValue={setOrderRestante} />
          <FormInput name="cambioDolar" holder="Cambio dólar" type="number" value={orderRestante} setValue={setOrderRestante} />
          <FormInput name="precioLibra" holder="Precio libra" type="number" value={orderRestante} setValue={setOrderRestante} />
        </div>
        <div className="flx flx-col order-restante-mensaje">
          {/* <p>{message}</p> */}
          <p>{`Hola ${order.name}, ya está tu pedido listo para entregar 🥰.`}</p>
          <p>{`El paquete pesó ${orderPeso.toFixed(2)} libras, en dólares $${orderEnvio.toFixed(2)}.`}</p>

          {saldo > 0 && <p>{`El restante era de $${saldo.toFixed(2)}.`}</p> }

          {saldo > 0 ?
            <p>{`En total $${ordereRestanteTotal.toFixed(2)}, en córdobas C$${ordereRestanteTotalCordobas.toFixed(2)} 🥰`}</p>
            :
            <p>{`En córdobas C$${ordereRestanteTotalCordobas.toFixed(2)} 🥰`}</p>
          }
        </div>
      </div>
    </div>
  );
}

export { OrderRestante };