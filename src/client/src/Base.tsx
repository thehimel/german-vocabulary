import './App.css';
import Cards from './units/Cards/Cards.tsx'
import NavigationBar from "./units/NavigationBar/NavigationBar.tsx";
import {Pagination} from "@nextui-org/react";
import Selectors from "./units/Selector/Selectors.tsx";

function Base() {
  return (
    <div className="flex flex-col">
      <NavigationBar/>
      <div className="flex flex-col min-h-screen justify-center items-center">
        <div className="flex justify-between w-full max-w-screen-lg mx-auto gap-2 pt-2 ps-2 pe-2">
          <Selectors/>
        </div>
        <div className="flex justify-center items-center pb-12">
          <Cards/>
        </div>
      </div>
      <div className="flex justify-center items-center fixed bottom-0 w-full pb-2 pt-2 bg-dark">
        <Pagination isCompact showControls total={10} initialPage={1} color="secondary" />
      </div>
    </div>
  )
}

export default Base
