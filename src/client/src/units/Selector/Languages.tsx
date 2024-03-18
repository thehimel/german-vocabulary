import {Select, SelectItem, Avatar} from "@nextui-org/react";

export default function Languages() {
  return (
    <Select
      className="max-w-xs"
      label="Learning"
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
