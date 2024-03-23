import ReactDOM from 'react-dom/client'
import {NextUIProvider} from '@nextui-org/react'
import App from './App.tsx'
import './index.css'
import {Provider} from "react-redux";
import store, {persistor} from "./store/store.ts";
import {HelmetProvider} from "react-helmet-async";
import {PersistGate} from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NextUIProvider>
        <HelmetProvider>
           <App/>
        </HelmetProvider>
      </NextUIProvider>
    </PersistGate>
  </Provider>
)
