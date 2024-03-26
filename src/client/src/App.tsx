import Metadata from "./units/Metadata/Metadata.tsx";
import {useAppSelector} from "./store/hooks.ts";
import AddWord from "./units/Screens/AddWord.tsx";
import Background from "./units/Theme/Background.tsx";
import NavigationBar from "./units/NavigationBar/NavigationBar.tsx";
import Home from "./units/Screens/Home.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";


function App() {
  const darkMode = useAppSelector((state) => state.base.darkMode);

  return (
    <BrowserRouter>
      <main className={`${darkMode ? 'dark' : ''} text-foreground bg-background`}>
        <Metadata/>
        <div className="relative">
          <Background/>
          <div className="h-screen">
            <NavigationBar/>
            <div className="bg-background">
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="add" element={<AddWord/>}/>
              </Routes>
            </div>
            {/* <PaginationBar/> */}
          </div>
        </div>
      </main>
    </BrowserRouter>
  );
}

export default App
