import './App.css';
import useDarkMode from "use-dark-mode";
import Cards from './units/Cards/Cards.tsx'
import NavigationBar from "./units/NavigationBar/NavigationBar.tsx";
import Selectors from "./units/Selector/Selectors.tsx";
import Background from "./units/Theme/Background.tsx";
import PaginationBar from "./units/NavigationBar/PaginationBar.tsx";

function Base() {
  const darkMode = useDarkMode().value;
  const bgColor = darkMode ? "bg-black" : "";
  return (
    <div className="relative">
      <Background/>
      <div className="flex flex-col h-screen">
        <NavigationBar darkMode={darkMode}/>
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
