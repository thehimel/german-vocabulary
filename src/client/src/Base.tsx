import './App.css';
import useDarkMode from "use-dark-mode";
import Cards from './units/Cards/Cards.tsx'
import NavigationBar from "./units/NavigationBar/NavigationBar.tsx";
import Selectors from "./units/Selector/Selectors.tsx";
import Background from "./units/Theme/Background.tsx";
import PaginationBar from "./units/NavigationBar/PaginationBar.tsx";

function Base() {
  const isDarkMode = useDarkMode().value;
  const bgColor = isDarkMode ? "bg-black" : "";
  return (
    <div className="relative">
      <Background isDarkMode={isDarkMode}/>
      <div className="flex flex-col h-screen">
        <NavigationBar isDarkMode={isDarkMode}/>
        <div className={`flex flex-col flex-grow justify-center ${bgColor}`}>
          <Selectors/>
          <Cards/>
        </div>
        <PaginationBar/>
      </div>
    </div>
  )
}

export default Base
