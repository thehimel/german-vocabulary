import {Select, SelectItem, Avatar} from "@nextui-org/react";
import {SelectorChange} from "./Selectors.tsx";
import {FC} from "react";
import {LanguageChoice} from "../../store/base/baseSlice.ts";

interface LanguageSelectorProps {
  label: string;
  defaultKey: string;
  choices: LanguageChoice[];
  onChange: SelectorChange;
}

const Languages: FC<LanguageSelectorProps> = ({ label, defaultKey, choices, onChange }) => {
  return (
    <Select
      className="max-w-xs"
      label={label}
      placeholder="Select language"
      defaultSelectedKeys={[defaultKey]}
      onChange={onChange}
    >
      {choices.map((choice: LanguageChoice) => (
        <SelectItem
          key={choice.language}
          startContent={<Avatar alt={choice.label} className="w-6 h-6" src={`https://flagcdn.com/${choice.country}.svg`} />}
        >
          {choice.label}
        </SelectItem>
      ))}
    </Select>
  );
}

export default Languages;
