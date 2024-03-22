import {Select, SelectItem} from "@nextui-org/react";

export default function Languages() {
  return (
    <Select
      className="max-w-xs w-3/5"
      label="Level"
      placeholder="Select level"
      defaultSelectedKeys={["a1"]}
    >
      <SelectItem key="a1">A1</SelectItem>
      <SelectItem key="a2">A2</SelectItem>
      <SelectItem key="a3">A3</SelectItem>
    </Select>
  );
}
