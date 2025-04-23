import React from "react";
import { baseUrl } from "../../urls/menuOptionsList";
import { MenuContext } from "../../Context/MenuContext";
import { DataContext } from "../../Context/DataContext";
import { OrderContext } from "../../Context/OrderContext";
import { Loading } from "../../Loading";
import { ClientSearch } from "../../ClientSearch";
import { FormInput } from "../../FormInput";
import { FormSpan } from "../../FormInput/FormSpan";
import { OrdersDetails } from "../../OrdersDetails";
import { OrderTotals } from "./OrderTotals";
import { OrderOptions } from "./OrderOptions";
import { OrderRestante } from "./OrderRestante";
import { FormButtons } from "../../FormInput/FormButtons";
import { sendData } from "../../Hooks/sendData";
import { sendDetails } from "../../Hooks/sendDetails";
import "../../styles/RegisterForm.css";
import "./OrderForm.css";

function OrderForm() {
  const { menuOption } = React.useContext(MenuContext);
  const { setOpenModal, registerId, isNew, setIsUpdating } = React.useContext(DataContext);
  const {
    isLoading,
    order, setOrder,
    orderTotals,
    productList, originalProductList,
  } = React.useContext(OrderContext);

  const [isSearchClientOpen, setIsSearchClientOpen] = React.useState(false);

  function handleRegister() {
    if (order.clientId === "") {
      alert("Selecciona un cliente");
      return;
    }
    if (productList.length === 0) {
      alert("Añade productos");
      return;
    }
    const fetchRegister = {
      clientId: order.clientId,
      orderDate: order.orderDate,
      state: order.state,
      weight: order.weight,
    }
    
    const url = `${baseUrl}ordersdetails/`;
    
    const sendOrder = async () => {
      try {
        const newOrder = await sendData(fetchRegister, menuOption.url + '/', registerId);
        
        if (!isNew) {
          sendDetails(originalProductList, productList, url);
        } else {
          const updatedDetails = productList.map((detail) => ({
            ...detail,
            orderId: newOrder.id
          }));
          sendDetails(originalProductList, updatedDetails, url);
        }
      } catch (error) {
        console.error("Error sending order:", error);
      }
    }

    sendOrder();    
    setOpenModal(false);
    setIsUpdating(true);
  }

  if (isLoading) return <Loading/>;

  return (
    <form
      action={handleRegister}
      className="flx flx-col order-container"
    >
      <div className="flx flx-col order-info-container">
        <h2 className="order-title">Información</h2>
        <div className="flx obj-info">
          <FormSpan name="order-id" holder="Pedido" value={order.id}/>

          <div className="flx flx-col frm-input-div">
            <label
              htmlFor="state"
              className="frm-input-label"
            >
              Estado
            </label>
            <select
              id="state"
              name="state"
              className="frm-input frm-select"
              value={order.state}
              onChange={(event) => {
                const newValue = {
                  ...order,
                  "state": event.target.value
                }
                setOrder(newValue);
              }}
            >
              <option key="1" value="Pendiente">Pendiente</option>
              <option key="2" value="Cancelado">Cancelado</option>
              <option key="3" value="Entregado">Entregado</option>
            </select>
          </div>
          <FormInput name="orderDate" holder="Fecha" type="date" value={order} setValue={setOrder}/>
        </div>

        <div className="flx obj-info">
          <FormSpan name="client-id" holder="Cliente" value={order.fullname}/>
          <button
            type="button"
            className="flx flx-center client-btn client-add"
            onClick={() => setIsSearchClientOpen(state => !state)}
          >
            {isSearchClientOpen ? 'Cerrar' : 'Buscar'}
          </button>
        </div>

        <ClientSearch register={order} setRegister={setOrder} isSearchClientOpen={isSearchClientOpen} setIsSearchClientOpen={setIsSearchClientOpen}/>

        <div className="flx obj-info">
          <FormSpan name="total order-total" holder="Total" value={orderTotals.totalSell ? orderTotals.totalSell : 0} type="number"/>
          <FormSpan name="abono order-total" holder="Abono" value={order.abonos ? order.abonos : 0} type="number"/>
          <FormSpan name="saldo order-total" holder="Saldo" value={(orderTotals.totalSell ? orderTotals.totalSell : 0) - (order.abonos ? order.abonos : 0)} type="number"/>
          <FormSpan name="profit order-total" holder="Ganancia" value={orderTotals.profit ? orderTotals.profit : 0} type="number"/>
        </div>
      </div>

      <OrdersDetails />

      <OrderTotals orderTotals={orderTotals}/>

      <OrderRestante orderTotals={orderTotals} order={order} setOrder={setOrder} isNew={isNew}/>

      {isNew ||
      <OrderOptions
        order={order}
        orderTotals={orderTotals}
      />}

      <FormButtons />
    </form>
  );
}

export { OrderForm };