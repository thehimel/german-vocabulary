import './App.css';
import Metadata from './units/Metadata/Metadata.tsx'
import Cards from './units/Cards/Cards.tsx'
import useDarkMode from "use-dark-mode";
import { HelmetProvider } from 'react-helmet-async';
import NavigationBar from "./units/NavigationBar/NavigationBar.tsx";

function Base() {
  return (
    <HelmetProvider>
      <>
        <Metadata></Metadata>
        <div className="flex flex-col h-screen">
          <NavigationBar/>
          <div className="flex-grow flex justify-center items-center">
            <Cards/>
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
