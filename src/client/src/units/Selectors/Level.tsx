import {Select, SelectItem} from "@nextui-org/react";
import {FC} from "react";
import {LevelChoice} from "../../store/base/baseSlice.ts";
import {SelectorChange} from "./Selectors.tsx";

interface LevelSelectorProps {
  label: string;
  defaultKey: string;
  choices: LevelChoice[];
  onChange: SelectorChange;
}

const Level: FC<LevelSelectorProps> = ({ label, defaultKey, choices, onChange }) => {
  return (
    <Select
      className="max-w-xs w-3/5"
      label={label}
      placeholder="Select level"
      defaultSelectedKeys={[defaultKey]}
      onChange={onChange}
    >
      {choices.map((choice: LevelChoice) => (
        <SelectItem key={choice.key}>{choice.label}</SelectItem>
      ))}
    </Select>
  );
}

export default Level;
