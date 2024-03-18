import {Select, SelectItem, Avatar} from "@nextui-org/react";

export default function Languages() {
  return (
    <Select
      className="max-w-xs"
      label="Language to learn"
    >
      <SelectItem
        key="german"
        startContent={<Avatar alt="German" className="w-6 h-6" src="https://flagcdn.com/de.svg" />}
      >
        German
      </SelectItem>
      <SelectItem
        key="english"
        startContent={<Avatar alt="English" className="w-6 h-6" src="https://flagcdn.com/us.svg" />}
      >
        English
      </SelectItem>
      <SelectItem
        key="bengali"
        startContent={<Avatar alt="Bengali" className="w-6 h-6" src="https://flagcdn.com/bd.svg" />}
      >
        Bengali
      </SelectItem>
    </Select>
  );
}
