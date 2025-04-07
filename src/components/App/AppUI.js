import React from 'react';
import './AppUI.css';
import { Header } from '../Header';
import { SideMenu } from '../SideMenu';
import { MainContent } from '../MainContent/MainContent';
import { DataProvider } from '../Context/DataContext';

function AppUI() {
  return (
    <div className='flx app-container'>
      <DataProvider>
        <SideMenu />
        <div className='flx flx-col main-window'>
          <Header />
          <MainContent/>
        </div>
      </DataProvider>
    </div>
  );
}

export { AppUI };