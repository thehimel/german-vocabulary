import './App.css';
import Metadata from './units/Metadata/Metadata.tsx'
import Cards from './units/Cards/Cards.tsx'
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <>
        <Metadata></Metadata>
        <div className="min-h-screen flex justify-center items-center">
          <Cards></Cards>
        </div>
      </>
    </HelmetProvider>
  )
}

export default App
