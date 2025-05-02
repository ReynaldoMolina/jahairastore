import React from 'react';
import './AppUI.css'; // up here so styles from each component load correctly 

import { Header } from '../Header';
import { ToggleMenuButton } from '../Header/ToggleMenuButton';
import { SideMenu } from '../SideMenu';
import { MainContent } from '../MainContent/MainContent';
import { DataContext } from '../Context/DataContext';
import { MenuContext } from '../Context/MenuContext';
import { AuthContext } from '../Context/AuthContext';

import { Login } from '../Login';
import { Home } from "../Home";
import { Categories } from "../Categories";
import { Clients } from "../Clients";
import { Orders } from "../Orders";
import { Products } from "../Products";
import { Providers } from "../Providers";
import { Receipts } from "../Receipts";
import { ProductsPage } from "../ProductsPage";

function AppUI() {
  const { auth } = React.useContext(AuthContext);

  const {
    openModal, setOpenModal,
    setRegisterId,
    setIsNew,
    loadAll, setLoadAll,
  } = React.useContext(DataContext);

  const {
    menuOptions,
    menuOption, setMenuOption,
    isMenuOpen, setIsMenuOpen,
  } = React.useContext(MenuContext);

  const components = {
    "Categorías": () =>
      <Categories
        menuOption={menuOption}
        openModal={openModal}
        setOpenModal={setOpenModal}
        setRegisterId={setRegisterId}
        setIsNew={setIsNew}
      />,
    "Clientes": () => 
      <Clients
        menuOption={menuOption}
        openModal={openModal}
        setOpenModal={setOpenModal}
        setRegisterId={setRegisterId}
        setIsNew={setIsNew}
      />,
    "Home": () => <Home />,
    "Pedidos": () =>
      <Orders
        menuOption={menuOption}
        openModal={openModal}
        setOpenModal={setOpenModal}
        setRegisterId={setRegisterId}
        setIsNew={setIsNew}
        loadAll={loadAll}
      />,
    "Productos": () =>
      <Products
        menuOption={menuOption}
        openModal={openModal}
        setOpenModal={setOpenModal}
        setRegisterId={setRegisterId}
        setIsNew={setIsNew}
        loadAll={loadAll}
      />,
    "Proveedores": () =>
      <Providers
        menuOption={menuOption}
        openModal={openModal}
        setOpenModal={setOpenModal}
        setRegisterId={setRegisterId}
        setIsNew={setIsNew}
      />,
    "Recibos": () =>
      <Receipts
        menuOption={menuOption}
        openModal={openModal}
        setOpenModal={setOpenModal}
        setRegisterId={setRegisterId}
        setIsNew={setIsNew}
        loadAll={loadAll}
      />,
    "Productos página": () =>
      <ProductsPage
        menuOption={menuOption}
        openModal={openModal}
        setOpenModal={setOpenModal}
        setRegisterId={setRegisterId}
        setIsNew={setIsNew}
      />,
  };

  if (!auth.isAuthenticated) return <Login />

  return (
    <main className='flx app-container'>
      <SideMenu
        setOpenModal={setOpenModal}
        setLoadAll={setLoadAll}
        menuOptions={menuOptions}
        menuOption={menuOption}
        setMenuOption={setMenuOption}
        isMenuOpen={isMenuOpen}
      />
      <div className='flx flx-col main-window'>
        <Header menuOption={menuOption} user={auth}>
          <ToggleMenuButton setIsMenuOpen={setIsMenuOpen} />
        </Header>
        <MainContent>
          {components[menuOption.name]()}
        </MainContent>
      </div>
    </main>
  );
}

export { AppUI };