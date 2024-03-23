import Metadata from "./units/Metadata/Metadata.tsx";
import {useAppSelector} from "./store/hooks.ts";
import Background from "./units/Theme/Background.tsx";
import NavigationBar from "./units/NavigationBar/NavigationBar.tsx";
import Home from "./units/Screens/Home.tsx";


function App() {
  const darkMode = useAppSelector((state) => state.base.darkMode);

  return (
    <main className={`${darkMode ? 'dark' : ''} text-foreground bg-background`}>
      <Metadata/>
      <div className="relative">
        <Background/>
        <div className="flex flex-col h-screen">
          <NavigationBar/>
          <div className="flex flex-col flex-grow bg-background">
            <Home/>
          </div>
          {/* <PaginationBar/> */}
        </div>
      </div>
    </main>
  );
}

export default App
