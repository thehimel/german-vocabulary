import {FC} from "react";
import {Select, SelectItem} from "@nextui-org/react";
import TextAvatar from "../Avatar/TextAvatar.tsx";
import {SelectorChange} from "./Selectors.tsx";
import {SelectorChoice} from "../../store/base/baseSlice.ts";

interface SelectorProps {
  label: string;
  defaultKey: string;
  choices: SelectorChoice[];
  onChange: SelectorChange;
  showAvatar?: boolean;
  width?: string;
}

const Selector: FC<SelectorProps> = ({ label, defaultKey, choices, onChange, showAvatar, width }) => {
  return (
    <Select
      items={choices}
      label={label}
      placeholder="Select language"
      defaultSelectedKeys={[defaultKey]}
      onChange={onChange}
      className={`max-w-xs ${width ? width : ''}`}
    >
      {(choice) => (
        <SelectItem key={choice.key} startContent={showAvatar && <TextAvatar text={choice.key} textColor="text-gray-50"/>}>
          {choice.label}
        </SelectItem>
      )}
    </Select>
  );
}

export default Selector;
