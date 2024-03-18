import './App.css';
import Metadata from './units/Metadata/Metadata.tsx'
import Cards from './units/Cards/Cards.tsx'

function App() {
  return (
    <>
      <Metadata></Metadata>
      <div className="min-h-screen flex justify-center items-center">
        <Cards></Cards>
      </div>
    </>
  )
}

export default App
