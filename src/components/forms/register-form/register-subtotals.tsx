import { useState } from 'react';
import { FormSpan } from '../form-inputs/form-inputs';
import { SalePayment } from '../form-inputs/sale-payment';
import { useFormContext } from '../register';

export function FormSubtotals({ credit }) {
  const { formName } = useFormContext();

  const subtotals = {
    compras: <PurchaseSubtotals />,
    pedidos: <OrderSubtotals />,
    ventas: <SaleSubtotals credit={credit} />,
  };

  return <>{subtotals[formName]}</>;
}

function SubtotalsDiv({ children }) {
  return <div className="flex w-full items-end gap-1 md:gap-3">{children}</div>;
}

function OrderSubtotals() {
  const { formTotals, formAbono } = useFormContext();
  const abono = formAbono;

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
        color="blue"
      />
    </SubtotalsDiv>
  );
}

function PurchaseSubtotals() {
  const { formTotals, formAbono } = useFormContext();
  const gastos = formAbono;

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

function SaleSubtotals({ credit }) {
  const { formTotals, formAbono } = useFormContext();
  const [isCredit, setIsCredit] = useState(credit);
  const abono = formAbono;
  const profit = formTotals.totalSell - formTotals.totalCost;
  return (
    <>
      <SubtotalsDiv>
        <FormSpan
          name="SaleTotal"
          holder="Total"
          value={formTotals.totalSell}
        />
        {isCredit && (
          <>
            <FormSpan
              name="SaleAbono"
              holder="Abono"
              value={abono || 0}
              color="green"
            />
            <FormSpan
              name="SaleBalance"
              holder="Saldo"
              value={formTotals.totalSell - (abono || 0)}
              color="red"
            />
          </>
        )}
        <FormSpan name="Profit" holder="Ganancia" value={profit} color="blue" />
      </SubtotalsDiv>
      <SalePayment isCredit={isCredit} setIsCredit={setIsCredit} />
    </>
  );
}
