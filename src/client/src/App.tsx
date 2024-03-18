import './App.css';
import Metadata from './units/Metadata/Metadata.tsx'
import Cards from './units/Cards/Cards.tsx'
import useDarkMode from "use-dark-mode";
import { HelmetProvider } from 'react-helmet-async';
import NavigationBar from "./units/NavigationBar/NavigationBar.tsx";
import {Pagination} from "@nextui-org/react";
import Selectors from "./units/Selector/Selectors.tsx";

function Base() {
  return (
    <HelmetProvider>
      <>
        <Metadata></Metadata>
        <div className="flex flex-col h-screen">
          <NavigationBar/>
          <div className="justify-center items-center">
            <div className="flex justify-between w-full max-w-screen-lg mx-auto">
              <Selectors/>
            </div>
            <div className="flex pt-4">
              <Cards/>
            </div>
          </div>
          <div className="flex justify-center items-center fixed bottom-0 w-full pb-4 bg-dark">
            <Pagination showShadow color="secondary" total={10} initialPage={1}/>
          </div>
        </div>
      </>
    </HelmetProvider>
  )
}

function App() {
  const darkMode = useDarkMode(true);

  return (
    <main className={`${darkMode.value ? 'dark' : ''} text-foreground bg-background`}>
      <Base/>
    </main>
  );
}

export default App
