import {useAppSelector} from "../../store/hooks.ts";

const Background = () => {
  const darkMode = useAppSelector((state) => state.base.darkMode);
  const themes = {
    'blackToPurple': 'bg-gradient-to-tr from-black via-sky-950 to-purple-950 from-50%',
    'blueToPurple': 'bg-gradient-to-tr from-sky-950 via-black to-purple-950',
  }
  const bgClasses = themes.blueToPurple
  const bgColor = darkMode ? bgClasses : '';

  return (
    <div className={`fixed inset-0 ${bgColor} opacity-90 lg:opacity-60`}></div>
  );
}

export default Background;
