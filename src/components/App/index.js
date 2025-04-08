import React from 'react';
import { AppUI } from './AppUI';
import { MenuProvider } from '../Context/MenuContext';
import { DataProvider } from '../Context/DataContext';

function App() {
  return (
    <MenuProvider>
      <DataProvider>
        <AppUI/>
      </DataProvider>
    </MenuProvider>
  );
}

export default App;
