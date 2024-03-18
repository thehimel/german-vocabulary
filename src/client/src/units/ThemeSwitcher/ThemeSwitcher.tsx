import useDarkMode from "use-dark-mode";
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';

export const ThemeSwitcher = () => {
  const darkMode = useDarkMode();

  const toggleDarkMode = () => {
    darkMode.toggle(); // Toggle between light and dark mode
  };

  return (
    <button onClick={toggleDarkMode}>
      {darkMode.value ? <SunIcon/> : <MoonIcon/>}
    </button>
  );
};
