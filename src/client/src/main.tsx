import ReactDOM from 'react-dom/client'
import {NextUIProvider} from '@nextui-org/react'
import App from './App.tsx'
import './index.css'
import {Provider} from "react-redux";
import store from "./store/store.ts";
import {HelmetProvider} from "react-helmet-async";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <NextUIProvider>
      <HelmetProvider>
         <App/>
      </HelmetProvider>
    </NextUIProvider>
  </Provider>
)
