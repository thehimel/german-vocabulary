import './App.css';
import Cards from './units/Cards/Cards.tsx'
import NavigationBar from "./units/NavigationBar/NavigationBar.tsx";
import Selectors from "./units/Selector/Selectors.tsx";
import Background from "./units/Theme/Background.tsx";
import PaginationBar from "./units/NavigationBar/PaginationBar.tsx";

function Base() {
  return (
    <div className="relative">
      <Background/>
      <div className="flex flex-col h-screen">
        <NavigationBar/>
        <div className="flex flex-col flex-grow justify-center items-center">
          <Selectors/>
          <Cards/>
        </div>
        <PaginationBar/>
      </div>
    </div>
  )
}

export default Base
