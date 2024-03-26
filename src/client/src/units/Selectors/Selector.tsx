import {FC} from "react";
import {Select, SelectItem} from "@nextui-org/react";
import TextAvatar from "../Avatar/TextAvatar.tsx";
import {SelectorChange} from "./Selectors.tsx";
import {SelectorChoice} from "../../store/base/baseSlice.ts";

interface SelectorProps {
  label: string;
  defaultKey?: string;
  choices: SelectorChoice[];
  onChange: SelectorChange;
  className?: string;
  showAvatar?: boolean;
}

const Selector: FC<SelectorProps> = ({ label, defaultKey, choices, onChange, showAvatar, className }) => {
  return (
    <Select
      items={choices}
      label={label}
      placeholder="Select language"
      defaultSelectedKeys={defaultKey? [defaultKey] : []}
      onChange={onChange}
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
