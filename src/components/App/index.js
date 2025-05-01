import React from 'react';
import { AppUI } from './AppUI';
import { MenuProvider } from '../Context/MenuContext';
import { DataProvider } from '../Context/DataContext';
import { AuthProvider } from '../Context/AuthContext';

function App() {
  return (
    <MenuProvider>
      <DataProvider>
        <AuthProvider>
          <AppUI/>
        </AuthProvider>
      </DataProvider>
    </MenuProvider>
  );
}

export default App;
