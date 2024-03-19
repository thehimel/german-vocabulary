import useDarkMode from "use-dark-mode";

function Background() {
  const darkMode = useDarkMode();
  return (
    <div className={`fixed inset-0 ${darkMode.value ? 'bg-gradient-to-bl from-purple-950 to-black' : ''}`}></div>
  );
}

export default Background;
