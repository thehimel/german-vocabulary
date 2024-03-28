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
  name?: string;
  value?: string;
}

const Selector: FC<SelectorProps> = ({ name, label, defaultKey, choices, onChange, required, showAvatar, className, value }) => {
  const darkMode = useAppSelector((state) => state.base.darkMode);
  toggleDarkModeStyleSheet(darkMode);

  return (
    <Select
      items={choices}
      name = {name}
      label={label}
      placeholder="Select language"
      defaultSelectedKeys={defaultKey? [defaultKey] : []}
      onChange={onChange}
      required={required ? required : false}
      className={className ? className : ''}
      value={value}
    >
      {(choice) => (
        <SelectItem key={choice.key} startContent={showAvatar && <TextAvatar text={choice.key} animate={true}/>}>
          {choice.label}
        </SelectItem>
      )}
    </Select>
  );
}

export default Selector;
