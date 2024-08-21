import {FC} from "react";
import {Select, SelectItem} from "@nextui-org/react";
import {useAppSelector} from "../../store/hooks.ts";
import TextAvatar from "../Avatar/TextAvatar.tsx";
import {SelectorChange} from "./Selectors.tsx";
import {SelectorChoice} from "../../store/base/baseSlice.ts";
import {toggleDarkModeStyleSheet} from "./utils.ts";

interface SelectorProps {
  label: string;
  placeholder?: string;
  defaultKey?: string;
  choices: SelectorChoice[];
  onChange: SelectorChange;
  isRequired?: boolean;
  className?: string;
  showAvatar?: boolean;
  name?: string;
  value?: string;
  isDisabled?: boolean;
}

const Selector: FC<SelectorProps> = ({ name, label, placeholder, defaultKey, choices, onChange, isRequired, showAvatar, className, value, isDisabled }) => {
  const darkMode = useAppSelector((state) => state.base.darkMode);
  toggleDarkModeStyleSheet(darkMode);

  return (
    <Select
      isDisabled={isDisabled}
      items={choices}
      name = {name}
      label={label}
      placeholder={placeholder || `Select ${label}`}
      defaultSelectedKeys={defaultKey? [defaultKey] : []}
      onChange={onChange}
      isRequired={isRequired ? isRequired : false}
      className={className ? className : ''}
      value={value}
      hidden={false}
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
