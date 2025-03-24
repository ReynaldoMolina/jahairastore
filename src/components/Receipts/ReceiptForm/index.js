import React from "react";
import { MenuContext } from "../../Context/MenuContext";
import { DataContext } from "../../Context/DataContext";
import { Loading } from "../../Loading";
import { ClientSearch } from "../../ClientSearch";
import { FormInput } from "../../FormInput";
import { FormSpan } from "../../FormInput/FormSpan";
import { ReceiptOptions } from "./ReceiptOptions";
import { FormButtons } from "../../FormInput/FormButtons";
import { useGetData } from "../../Hooks/useGetData";
import { sendData } from "../../Hooks/sendData";
import addIcon from "./add.svg";
import "../../styles/RegisterForm.css";

function ReceiptForm() {
  const { menuOption } = React.useContext(MenuContext);
  const { setOpenModal, registerId, orderReceipt, isNew, setIsUpdating } = React.useContext(DataContext);
  
  const url = `${menuOption.url}${registerId}`;
  const { data, isLoading } = useGetData(url);
  const currenDate = new Date().toISOString().split("T")[0];
  
  const [isSearchClientOpen, setIsSearchClientOpen] = React.useState(false);
  const [receipt, setReceipt] = React.useState({
    clientId: orderReceipt.clientId || '',
    orderId: orderReceipt.id || '',
    saleDate: currenDate,
    abono: orderReceipt.abono || 0,
    saldo: orderReceipt.saldoInicial - orderReceipt.abono || 0,
    concepto: orderReceipt.concepto || "",
    fullname: orderReceipt.fullname || '',
  });
  
  React.useEffect(() => {
    if (!isNew) {
      if (data) {
        const { id, ...newData } = data
        setReceipt(newData);
      }
    }
  }, [data, isNew]);
  
  let saldoInicialActual = 0;
  if (isNew) {
    saldoInicialActual = orderReceipt.saldoInicial;
    console.log(saldoInicialActual);
  } else {
    saldoInicialActual = data.saldo;
    console.log(saldoInicialActual);
  }

  console.log(receipt);

  function handleRegister() {
    if (receipt.abono <= 0) {
      alert('El abono debe ser mayor a cero');
      return;
    }
    if (receipt.saldo < 0) {
      alert('El saldo no puede ser menor a cero');
      return;
    }
    const { fullname, ...newData } = receipt;
    console.log(newData, menuOption.url, registerId);
    sendData(newData, menuOption.url, registerId);
    setOpenModal(false);
    setIsUpdating(true);
  }

  return (
    <>
      {isLoading ? <Loading/> :
      (
        <form
          action={handleRegister}
          className="flx flx-col frm-container"
        >
          {isNew || (
            <div className="flx obj-info">
              <span className="flx flx-center form-id">{data.id}</span>
            </div>
          )}
          <div className="flx obj-info">
            <FormInput name="orderId" holder="Pedido" type="number" value={receipt} setValue={setReceipt}/>
            <FormInput name="saleDate" holder="Fecha" type="date" value={receipt} setValue={setReceipt}/>
          </div>
          <div className="flx obj-info">
            <FormSpan name="client-id" holder="Cliente" value={receipt.fullname}/>
            <button
              type="button"
              className="flx flx-center client-btn client-add"
              onClick={() => setIsSearchClientOpen(state => !state)}
            >
              {isSearchClientOpen ? 'Cerrar' : 'Buscar'}
            </button>
          </div>

          <ClientSearch register={receipt} setRegister={setReceipt} isSearchClientOpen={isSearchClientOpen} setIsSearchClientOpen={setIsSearchClientOpen}/>

          <div className="flx obj-info">

            <div className="flx flx-col">
              <label
                htmlFor="abono"
                className="frm-input-label"
              >
                Abono
              </label>
              <input
                type="number"
                name="abono"
                id="abono"
                className="frm-input"
                placeholder="Abono"
                value={receipt['abono']}
                onChange={(event) => {
                  const {id, ...valueNoId} = receipt;
                  const newValue = {
                    ...valueNoId,
                    'abono': event.target.valueAsNumber,
                    'saldo': saldoInicialActual - event.target.value
                  }
                  setReceipt(newValue)
                }}
              >
              </input>
            </div>

            <FormInput name="saldo" holder="Saldo" value={receipt} setValue={setReceipt} type="number"/>
          </div>
          <div className="flx obj-info">
            <FormInput name="concepto" holder="Concepto" value={receipt} setValue={setReceipt}/>
          </div>

          {isNew || <ReceiptOptions/>}

          <FormButtons />
        </form>
      )}
    </>
  )
}

export { ReceiptForm };