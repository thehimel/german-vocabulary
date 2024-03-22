import Base from "./Base.tsx";
import Metadata from "./units/Metadata/Metadata.tsx";
import {useAppSelector} from "./store/hooks.ts";


function App() {
  const darkMode = useAppSelector((state) => state.base.darkMode);

  return (
    <main className={`${darkMode ? 'dark' : ''} text-foreground bg-background`}>
      <Metadata/>
      <Base/>
    </main>
  );
}

export default App
