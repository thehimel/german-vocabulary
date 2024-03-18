import useDarkMode from "use-dark-mode";

export const ThemeSwitcher = () => {
  const darkMode = useDarkMode();

  const toggleDarkMode = () => {
    darkMode.toggle(); // Toggle between light and dark mode
  };

  return (
    <button onClick={toggleDarkMode}>
      {darkMode.value ? "☀️" : "🌙"}
    </button>
  );
};
