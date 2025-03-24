import React from "react";
import { MenuContext } from "../../../Context/MenuContext";
import { DataContext } from "../../../Context/DataContext";
import { ReactComponent as SvgReceipts } from "./receipts.svg";
import { ReactComponent as SvgHundred } from "./one-hundred.svg";
import { ReactComponent as SvgFifty } from "./fifty.svg";
import { ReactComponent as SvgOther } from "./other.svg";
import { FormOption } from "../../../FormOption";
import "../../../styles/FormOptions.css";

const svgClass = "register-option";

function OrderOptions({ order, orderTotals }) {
  const { menuOptions, setMenuOption } = React.useContext(MenuContext);
  const { setSearchValue, setOpenModal, setRegisterId, setIsNew, setOrderReceipt } = React.useContext(DataContext);

  const [paymentMenu, setPaymentMenu] = React.useState(false);
  const clientReceipts = menuOptions[3];
  const saldoInicial = orderTotals.totalSell - order.abonos;

  function goToReceipts() {
    setSearchValue(`${order.id} ${order.fullname}`);
    setOpenModal(false);
    setMenuOption(clientReceipts);
  }

  function payReceipt(payment) {
    let abono = 0;
    let concepto = `Abono pedido ${order.id}`;
    switch (payment) {
      case 'half':
        abono = saldoInicial / 2;
        concepto = `Abono 50% pedido ${order.id}`;
        break;
      case 'full':
        abono = saldoInicial;
        concepto = `Cancelación pedido ${order.id}`;
        break;
      default:
        break;
    }
    const receiptOrder = {
      id: order.id,
      clientId: order.clientId,
      fullname: order.fullname,
      abono,
      saldoInicial,
      concepto
    }
    console.log('receiptOrder', receiptOrder);
    
    setOrderReceipt(receiptOrder);
    setRegisterId('');
    setIsNew(true);
    setMenuOption(clientReceipts);
  }

  function openPaymentMenu() {
    if (saldoInicial > 0) {
      setPaymentMenu(state => !state)
    } else {
      alert("Pedido pagado")
    }
  }

  return (
    <div className="flx flx-center register-options">
      <div className="flx">
        <FormOption
          label="Pagar"
          action={openPaymentMenu}
        >
          <SvgReceipts className={svgClass} />
        </FormOption>

        <div className={`flx flx-center register-options-payment ${paymentMenu || "hidden"}`}>
          <SvgOther
            className="payment-opt"
            onClick={() => payReceipt("zero")}
          />

          <SvgFifty
            className="payment-opt"
            onClick={() => payReceipt("half")}
          />
          <SvgHundred
            className="payment-opt"
            onClick={() => payReceipt("full")}
          />
        </div>
      </div>

      <FormOption
        label="Ventas"
        action={goToReceipts}
        >
        <SvgReceipts className={svgClass} />
      </FormOption>
    </div>
  )
}

export { OrderOptions };