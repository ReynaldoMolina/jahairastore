import React from 'react';
import { AppUI } from './AppUI';
import { MenuProvider } from '../Context/MenuContext';
import { DataProvider } from '../Context/DataContext';
import { Login } from '../Login';

function App() {
  return (
    <MenuProvider>
      <DataProvider>
        {/* <AppUI/> */}
        <Login/>
      </DataProvider>
    </MenuProvider>
  );
}

export default App;
