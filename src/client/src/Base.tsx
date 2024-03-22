import './App.css';
import NavigationBar from "./units/NavigationBar/NavigationBar.tsx";
import Background from "./units/Theme/Background.tsx";
import PaginationBar from "./units/NavigationBar/PaginationBar.tsx";
import Home from "./units/Screens/Home.tsx";

function Base() {
  return (
    <div className="relative">
      <Background/>
      <div className="flex flex-col h-screen">
        <NavigationBar />
        <div className="flex flex-col flex-grow justify-center bg-background">
          <Home/>
        </div>
        <PaginationBar/>
      </div>
    </div>
  )
}

export default Base
