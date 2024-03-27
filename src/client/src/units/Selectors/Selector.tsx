import {FC} from "react";
import {Select, SelectItem} from "@nextui-org/react";
import {useAppSelector} from "../../store/hooks.ts";
import TextAvatar from "../Avatar/TextAvatar.tsx";
import {SelectorChange} from "./Selectors.tsx";
import {SelectorChoice} from "../../store/base/baseSlice.ts";
import {toggleDarkModeStyleSheet} from "./utils.ts";

interface SelectorProps {
  label: string;
  defaultKey?: string;
  choices: SelectorChoice[];
  onChange: SelectorChange;
  required?: boolean;
  className?: string;
  showAvatar?: boolean;
}

const Selector: FC<SelectorProps> = ({ label, defaultKey, choices, onChange, required, showAvatar, className }) => {
  const darkMode = useAppSelector((state) => state.base.darkMode);
  toggleDarkModeStyleSheet(darkMode);

  return (
    <Select
      items={choices}
      label={label}
      placeholder="Select language"
      defaultSelectedKeys={defaultKey? [defaultKey] : []}
      onChange={onChange}
      required={required ? required : false}
      className={className ? className : ''}
    >
      {(choice) => (
        <SelectItem key={choice.key} startContent={showAvatar && <TextAvatar text={choice.key}/>}>
          {choice.label}
        </SelectItem>
      )}
    </Select>
  );
}

export default Selector;
