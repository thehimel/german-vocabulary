import {useEffect} from "react";
import {Toaster} from "sonner";
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
import {HOME_URL, PREVIEWS_ADD_INDEX_URL, PREVIEWS_ADD_URL, PREVIEWS_URL, V2_PREVIEWS_ADD_URL} from "./units/urls.ts";


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
            <Toaster position="top-center" expand={true} theme={darkMode ? "dark" : "light"} />
            <Messages/>
            <div className="bg-background pb-2">
              <Routes>
                <Route path={HOME_URL} element={<Home/>}/>
                <Route path={PREVIEWS_URL} element={<Previews/>}/>
                <Route path={PREVIEWS_ADD_URL} element={<AddPreview/>}/>
                <Route path={PREVIEWS_ADD_INDEX_URL} element={<AddPreview/>}/>
                <Route path={V2_PREVIEWS_ADD_URL} element={<CreatePreview/>}/>
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
