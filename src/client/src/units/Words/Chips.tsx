import {FC} from "react";
import {Chip} from "@nextui-org/react";

interface ChipsProps {
  items: Record<string, string>[];
  color: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
  variant: "shadow" | "flat" | "dot" | "solid" | "bordered" | "light" | "faded" | undefined;
}

const Chips: FC<ChipsProps> = ({items, color, variant}) => {
  return (
    <div className="flex flex-row gap-1">
      {items.map((item, index) => (
        <div key={index} className={`${item.title.length == 1 && 'pt-0.5'}`}>
          <Chip color={color} variant={variant}>
            {item.title}
          </Chip>
        </div>
      ))}
    </div>
  );
};

export default Chips;
