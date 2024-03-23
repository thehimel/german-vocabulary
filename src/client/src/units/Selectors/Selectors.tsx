import Languages from "./Languages.tsx";
import Level from "./Level.tsx";
import {AppDispatch} from "../../store/store.ts";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {ChangeEvent} from "react";
import {setLevel, setPrimaryLanguage, setSecondaryLanguage} from "../../store/base/baseActions.ts";

export type SelectorChange = (e: ChangeEvent<HTMLSelectElement>) => void;

function Selectors() {
  const dispatch: AppDispatch = useAppDispatch();
  const primaryLanguage = useAppSelector((state) => state.base.primaryLanguage);
  const secondaryLanguage = useAppSelector((state) => state.base.secondaryLanguage);
  const level = useAppSelector((state) => state.base.level);
  const changePrimaryLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setPrimaryLanguage(e.target.value));
  };

  const changeSecondaryLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSecondaryLanguage(e.target.value));
  };

  const changeLevel = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLevel(e.target.value));
  };

  return (
    <div className="flex justify-between w-full max-w-screen-lg mx-auto gap-2 pt-2 ps-2 pe-2">
      <Languages label="Learning" defaultKey={primaryLanguage} onChange={changePrimaryLanguage}/>
      <Languages label="With" defaultKey={secondaryLanguage} onChange={changeSecondaryLanguage}/>
      <Level label="Level" defaultKey={level} onChange={changeLevel}/>
    </div>
  );
}

export default Selectors;
