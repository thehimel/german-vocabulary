import {Select, SelectItem} from "@nextui-org/react";
import {FC} from "react";
import {SelectorProps} from "./Languages.tsx";

const Level: FC<SelectorProps> = ({ label, defaultKey, onChange }) => {
  return (
    <Select
      className="max-w-xs w-3/5"
      label={label}
      placeholder="Select level"
      defaultSelectedKeys={[defaultKey]}
      onChange={onChange}
    >
      <SelectItem key="a1">A1</SelectItem>
      <SelectItem key="a2">A2</SelectItem>
      <SelectItem key="a3">A3</SelectItem>
    </Select>
  );
}

export default Level;
