import Base from "./Base.tsx";
import useDarkMode from "use-dark-mode";
import Metadata from "./units/Metadata/Metadata.tsx";


function App() {
  const darkMode = useDarkMode(true);

  return (
    <main className={`${darkMode.value ? 'dark' : ''} text-foreground bg-background`}>
      <Metadata/>
      <Base/>
    </main>
  );
}

export default App
