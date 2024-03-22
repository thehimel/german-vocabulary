import './App.css';
import useDarkMode from "use-dark-mode";
import NavigationBar from "./units/NavigationBar/NavigationBar.tsx";
import Background from "./units/Theme/Background.tsx";
import PaginationBar from "./units/NavigationBar/PaginationBar.tsx";
import Home from "./units/Screens/Home.tsx";

function Base() {
  const isDarkMode = useDarkMode().value;

  return (
    <div className="relative">
      <Background isDarkMode={isDarkMode}/>
      <div className="flex flex-col h-screen">
        <NavigationBar isDarkMode={isDarkMode}/>
        <div className="flex flex-col flex-grow justify-center bg-background">
          <Home/>
        </div>
        <PaginationBar/>
      </div>
    </div>
  )
}

export default Base
