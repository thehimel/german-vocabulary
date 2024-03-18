import './App.css';
import Cards from './units/Cards/Cards.tsx'
import NavigationBar from "./units/NavigationBar/NavigationBar.tsx";
import {Pagination} from "@nextui-org/react";
import Selectors from "./units/Selector/Selectors.tsx";

function Base() {
  return (
    <div className="flex flex-col h-screen">
      <NavigationBar/>
      <div className="">
        <div className="flex justify-between w-full max-w-screen-lg mx-auto gap-2 p-2">
          <Selectors/>
        </div>
        <div className="flex justify-center items-center">
          <Cards/>
        </div>
      </div>
      <div className="flex justify-center items-center fixed bottom-0 w-full pb-4 bg-dark">
        <Pagination showShadow color="secondary" total={10} initialPage={1}/>
      </div>
    </div>
  )
}

export default Base
