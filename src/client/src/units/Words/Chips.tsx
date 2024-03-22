import {FC} from "react";
import {Chip} from "@nextui-org/react";

interface ChipsProps {
  items: [Record<string, string>];
  color: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
  variant: "shadow" | "flat" | "dot" | "solid" | "bordered" | "light" | "faded" | undefined;
}

const Chips: FC<ChipsProps> = ({items, color, variant}) => {
  return (
    <div className="flex flex-row gap-1">
      {items.map((item, index) => (
        <Chip key={index} color={color} variant={variant}>
          {item.title}
        </Chip>
      ))}
    </div>
  );
};

export default Chips;
