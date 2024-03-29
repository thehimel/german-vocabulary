import {useEffect} from "react";
import {fetchProperties} from "./store/base/baseActions.ts";
import {AppDispatch} from "./store/store.ts";
import Metadata from "./units/Metadata/Metadata.tsx";
import {useAppDispatch, useAppSelector} from "./store/hooks.ts";
import AddWord from "./units/Screens/AddWord.tsx";
import Previews from "./units/Screens/Previews.tsx";
import Background from "./units/Theme/Background.tsx";
import NavigationBar from "./units/NavigationBar/NavigationBar.tsx";
import Home from "./units/Screens/Home.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";


function App() {
  const darkMode = useAppSelector((state) => state.base.darkMode);
  const dispatch: AppDispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProperties())
  }, [dispatch]);

  return (
    <BrowserRouter>
      <main className={`${darkMode ? 'dark' : ''} text-foreground bg-background`}>
        <Metadata/>
        <div className="relative">
          <Background/>
          <div className="h-screen">
            <NavigationBar/>
            <div className="bg-background pb-2">
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="add/" element={<Previews/>}/>
                <Route path="add/:index" element={<AddWord/>}/>
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
