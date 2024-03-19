import './App.css';
import Cards from './units/Cards/Cards.tsx'
import NavigationBar from "./units/NavigationBar/NavigationBar.tsx";
import {Pagination} from "@nextui-org/react";
import Selectors from "./units/Selector/Selectors.tsx";
import useDarkMode from "use-dark-mode";

function Base() {
  const darkMode = useDarkMode();

  return (
    <div className="relative">
      <div className={`fixed inset-0 ${darkMode.value ? 'bg-gradient-to-bl from-purple-950 to-transparent' : ''}`}></div>
      <div className="flex flex-col h-screen">
        <NavigationBar/>
        <div className="flex flex-col h-screen justify-center items-center">
          <div className="flex justify-between w-full max-w-screen-lg mx-auto gap-2 pt-2 ps-2 pe-2">
            <Selectors/>
          </div>
          <div className="flex justify-center items-center pb-12">
            <Cards/>
          </div>
        </div>
        <div className="fixed bottom-0 w-full bg-dark z-10">
          <div className="flex justify-center items-center pb-2 pt-2">
            <Pagination isCompact showControls total={10} initialPage={1} color="secondary" size="lg"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Base
