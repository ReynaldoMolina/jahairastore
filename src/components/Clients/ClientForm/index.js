import React from "react";
import { AuthContext } from "../../Context/AuthContext";
import { MenuContext } from "../../Context/MenuContext";
import { DataContext } from "../../Context/DataContext";
import { useGetData } from "../../Hooks/useGetData";
import { Loading } from "../../Loading";
import { FormInput } from "../../FormInput";
import { ClientOptions } from "./ClientOptions";
import { FormButtons } from "../../FormInput/FormButtons";
import { sendData } from "../../Hooks/sendData";
import "../../styles/RegisterForm.css";

function ClientForm() {
  const { auth } = React.useContext(AuthContext);
  const { menuOption } = React.useContext(MenuContext);
  const { setOpenModal, registerId, isNew, setIsUpdating } = React.useContext(DataContext);

  let url = isNew ? '' : `${menuOption.url}/${registerId}`;
  const { data, isLoading } = useGetData(url);

  const [client, setClient] = React.useState({
    name: "",
    lastname: "",
    phone: "",
    municipio: "",
    city: "",
    country: "",
    address: "",
    userId: null
  });

  React.useEffect(() => {
    if (!isNew) {
      if (data) {
        const { id, ...newData } = data;
        setClient(newData);
      }
    } 
  }, [data]);
  
  function handleRegister() {
    if (client.name === "" || client.lastname === "") {
      alert("Name and last name are needed.")
      return;
    }
    sendData(client, menuOption.url, registerId, auth.token);
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
              <FormInput name="name" holder="Nombre" value={client} setValue={setClient}/>
              <FormInput name="lastname" holder="Apellido" value={client} setValue={setClient}/>
            </div>
            <div className="flx obj-info">
              <FormInput name="phone" holder="Teléfono" value={client} setValue={setClient}/>
              <FormInput name="municipio" holder="Municipio" value={client} setValue={setClient} autocomplete="on"/>
            </div>
            <div className="flx obj-info">
              <FormInput name="city" holder="Ciudad" value={client} setValue={setClient} autocomplete="on"/>
              <FormInput name="country" holder="País" value={client} setValue={setClient} autocomplete="on"/>
            </div>
            <div className="flx obj-info">
              <FormInput name="address" holder="Dirección" value={client} setValue={setClient}/>
            </div>
            
            {isNew || <ClientOptions fullname={`${client.name} ${client.lastname}`} />}

            <FormButtons/>
          </form>
        )}
    </>
  )
}

export { ClientForm };