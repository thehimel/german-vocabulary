import Base from "./Base.tsx";
import useDarkMode from "use-dark-mode";
import Metadata from "./units/Metadata/Metadata.tsx";
import {HelmetProvider} from "react-helmet-async";


function App() {
  const darkMode = useDarkMode(true);

  return (
    <main className={`${darkMode.value ? 'dark' : ''} text-foreground bg-background`}>
      <HelmetProvider>
        <Metadata/>
        <Base/>
      </HelmetProvider>
    </main>
  );
}

export default App
