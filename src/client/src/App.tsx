import Base from "./Base.tsx";
import useDarkMode from "use-dark-mode";


function App() {
  const darkMode = useDarkMode(true);

  return (
    <main className={`${darkMode.value ? 'dark' : ''} text-foreground bg-background`}>
      <Base/>
    </main>
  );
}

export default App
