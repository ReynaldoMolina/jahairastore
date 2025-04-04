import React from "react";
import { MenuContext } from "../../Context/MenuContext";
import { DataContext } from "../../Context/DataContext";
import { useGetData } from "../../Hooks/useGetData";
import { FormInput } from "../../FormInput";
import { FormButtons } from "../../FormInput/FormButtons";
import { sendData } from "../../Hooks/sendData";
import { Loading } from "../../Loading";
import "../../styles/RegisterForm.css";

function ProductPageForm() {
  const { menuOption } = React.useContext(MenuContext);
  const { setOpenModal, registerId, isNew, setIsUpdating } = React.useContext(DataContext);
  const { data, isLoading } = useGetData(menuOption.url + registerId);

  const [product, setProduct] = React.useState({
    name: '',
    price: 0,
    image: '',
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
      alert("Nombre requerido");
      return;
    } else if (product.price === "" || product.image === "") {
      alert("Precio y link de la imagen requeridos");
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
            <FormInput name="price" holder="Precio" type="number" value={product} setValue={setProduct}/>
          </div>
          <div className="flx obj-info">
            <FormInput name="image" holder="Link de imagen" value={product} setValue={setProduct}/>
          </div>
          <div className="flx flx-center obj-info">
            <img src={product.image} className="product-image" alt="Product"></img>
          </div>

          <FormButtons />
        </form>
      )}
    </>
  )
}

export { ProductPageForm };