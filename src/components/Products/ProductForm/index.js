import React from "react";
import { MenuContext } from "../../Context/MenuContext";
import { DataContext } from "../../Context/DataContext";
import { useGetData } from "../../Hooks/useGetData";
import { FormInput } from "../../FormInput";
import { FormSpan } from "../../FormInput/FormSpan";
import { FormSelect } from "../../FormInput/FormSelect";
import { FormButtons } from "../../FormInput/FormButtons";
import { sendData } from "../../Hooks/sendData";
import { Loading } from "../../Loading";
import "../../styles/RegisterForm.css";
import { AuthContext } from "../../Context/AuthContext";

function ProductForm() {
  const { auth } = React.useContext(AuthContext);
  const { menuOption } = React.useContext(MenuContext);
  const { setOpenModal, registerId, isNew, setIsUpdating } = React.useContext(DataContext);
  
  let url = isNew ? '' : `${menuOption.url}/${registerId}`;
  const { data, isLoading } = useGetData(url);

  const currenDate = new Date().toISOString().split("T")[0];
  const selectProvider = 4;
  const selectCategory = 6;
  
  const [product, setProduct] = React.useState({
    providerId: 1,
    name: '',
    description: '',
    costPrice: 0,
    sellPrice: 0,
    categoryId: 1,
    addedDate: currenDate,
    sheinId: ''
  });

  React.useEffect(() => {
    if (!isNew) {
      if (data) {
        const { id, ...newData } = data;
        setProduct(newData);
      }
    }
  }, [data]);

  function handleRegister() {
    if (product.name === "") {
      alert("Name required");
      return;
    } else if (product.providerId === "" || product.categoryId === "") {
      alert("Provider and Category required");
      return;
    }
    sendData(product, menuOption.url, registerId, auth.token);
    setOpenModal(false);
    setIsUpdating(true);
  }

  if (isLoading) return <Loading />;

  return (
    <form
      action={handleRegister}
      className="flx flx-col frm-container">
      {isNew || (
        <div className="flx obj-info">
          <span className="flx flx-center form-id">{data.id}</span>
        </div>
      )}
      <div className="flx obj-info">
        <FormInput name="name" holder="Nombre" value={product} setValue={setProduct}/>
      </div>
      <div className="flx obj-info">
        <FormSelect name="providerId" holder="Proveedor" value={product} setValue={setProduct} option={selectProvider} field={"company"}/>
        <FormInput name="addedDate" holder="Fecha agregado" type="date" value={product} setValue={setProduct}/>
      </div>
      <div className="flx obj-info">
        <FormSelect name="categoryId" holder="Categoría" value={product} setValue={setProduct} option={selectCategory} field={"name"}/>
        <FormInput name="sheinId" holder="Shein Id" value={product} setValue={setProduct}/>
      </div>
      <div className="flx obj-info">
        <FormInput name="costPrice" holder="Precio compra" type="number" value={product} setValue={setProduct}/>
        <FormInput name="sellPrice" holder="Precio venta" type="number" value={product} setValue={setProduct}/>
        <FormSpan name="form-profit" holder="Ganancia" value={(product.sellPrice - product.costPrice).toFixed(2)}/>
      </div>
      <div className="flx obj-info">
        <FormInput name="description" holder="Descripción" value={product} setValue={setProduct}/>
      </div>

      <FormButtons />
    </form>
  )
}

export { ProductForm };