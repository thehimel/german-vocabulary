import {Select, SelectItem, Avatar} from "@nextui-org/react";
import {SelectorChange} from "./Selectors.tsx";
import {FC} from "react";

export interface SelectorProps {
  label: string;
  defaultKey: string;
  onChange: SelectorChange;
}

const Languages: FC<SelectorProps> = ({ label, defaultKey, onChange }) => {
  return (
    <Select
      className="max-w-xs"
      label={label}
      placeholder="Select language"
      defaultSelectedKeys={[defaultKey]}
      onChange={onChange}
    >
      <SelectItem
        key="de"
        startContent={<Avatar alt="German" className="w-6 h-6" src="https://flagcdn.com/de.svg" />}
      >
        German
      </SelectItem>
      <SelectItem
        key="en"
        startContent={<Avatar alt="English" className="w-6 h-6" src="https://flagcdn.com/us.svg" />}
      >
        English
      </SelectItem>
      <SelectItem
        key="bn"
        startContent={<Avatar alt="Bengali" className="w-6 h-6" src="https://flagcdn.com/bd.svg" />}
      >
        Bengali
      </SelectItem>
    </Select>
  );
}

export default Languages;
