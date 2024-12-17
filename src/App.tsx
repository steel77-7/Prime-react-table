import { useEffect, useState } from "react";
import "./App.css";
import TableComponent from "./components/TableComponent";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css"


import { PrimeReactProvider } from 'primereact/api';
        
function App() {
  const [count, setCount] = useState(0);
 
  
  return (
    <>
      <PrimeReactProvider value={{ unstyled: false }}>
        <TableComponent />
      </PrimeReactProvider>
    </>
  );
}

export default App;
