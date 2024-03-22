import { SunIcon, MoonIcon } from '@radix-ui/react-icons';
import {AppDispatch} from "../../store/store.ts";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {toggleDarkMode} from "../../store/base/baseActions.ts";

export const ThemeSwitcher = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.base.darkMode);

  const handleOnClick = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <button onClick={handleOnClick}>
      {darkMode ? <SunIcon/> : <MoonIcon/>}
    </button>
  );
};
