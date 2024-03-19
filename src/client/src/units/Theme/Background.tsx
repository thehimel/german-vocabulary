import useDarkMode from "use-dark-mode";

function Background() {
  const darkMode = useDarkMode().value;
  const bgColor = darkMode ? "bg-gradient-to-bl from-purple-950 to-black" : "";
  return (
    <div className={`fixed inset-0 ${bgColor}`}></div>
  );
}

export default Background;
