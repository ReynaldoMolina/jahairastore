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

function ProductForm() {
  const { menuOption } = React.useContext(MenuContext);
  const { setOpenModal, registerId, isNew, setIsUpdating } = React.useContext(DataContext);
  const { data, isLoading } = useGetData(menuOption.url + registerId);

  const currenDate = new Date().toISOString().split("T")[0];
  const selectProvider = 4;
  const selectCategory = 6;
  
  const [product, setProduct] = React.useState({
    providerId: '',
    name: '',
    description: '',
    costPrice: 0,
    sellPrice: 0,
    categoryId: '',
    addedDate: currenDate,
    sheinId: ''
  });

  React.useEffect(() => {
    if (!isNew) {
      if (data) {
        setProduct(data);
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
    sendData(product, menuOption.url, registerId);
    setOpenModal(false);
    setIsUpdating(true);
  }

  return (
    <>
      {isLoading ? <Loading/> :
      (
        <form
          action={handleRegister}
          autoComplete="off"
          className="flx flx-col frm-container">
          {isNew || (
            <div className="flx obj-info">
              <span className="flx flx-center form-id">{data.id}</span>
            </div>
          )}
          <div className="flx obj-info">
            <FormInput name="name" holder="Name" value={product} setValue={setProduct}/>
          </div>
          <div className="flx obj-info">
            <FormSelect name="providerId" holder="Provider" value={product} setValue={setProduct} option={selectProvider} field={"company"}/>
            <FormInput name="addedDate" holder="Added date" type="date" value={product} setValue={setProduct}/>
          </div>
          <div className="flx obj-info">
            <FormSelect name="categoryId" holder="Category" value={product} setValue={setProduct} option={selectCategory} field={"name"}/>
            <FormInput name="sheinId" holder="Shein Id" value={product} setValue={setProduct}/>
          </div>
          <div className="flx obj-info">
            <FormInput name="costPrice" holder="Cost price" type="number" value={product} setValue={setProduct}/>
            <FormInput name="sellPrice" holder="Sell Price" type="number" value={product} setValue={setProduct}/>
            <FormSpan name="form-profit" holder="Profit" value={(product.sellPrice - product.costPrice).toFixed(2)}/>
          </div>
          <div className="flx obj-info">
            <FormInput name="description" holder="Description" value={product} setValue={setProduct}/>
          </div>

          <FormButtons />
        </form>
      )}
    </>
  )
}

export { ProductForm };