import {useEffect} from "react";
import {fetchProperties} from "./store/base/baseActions.ts";
import {AppDispatch} from "./store/store.ts";
import Messages from "./units/Messages/Messages.tsx";
import Metadata from "./units/Metadata/Metadata.tsx";
import {useAppDispatch, useAppSelector} from "./store/hooks.ts";
import AddPreview from "./units/Screens/AddPreview.tsx";
import CreatePreview from "./units/Screens/CreatePreview.tsx";
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
            <Messages/>
            <div className="bg-background pb-2">
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/add" element={<Previews/>}/>
                <Route path="/add/:index" element={<AddPreview/>}/>
                <Route path="/add/new" element={<AddPreview/>}/>
                <Route path="/previews/add" element={<CreatePreview/>}/>
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
