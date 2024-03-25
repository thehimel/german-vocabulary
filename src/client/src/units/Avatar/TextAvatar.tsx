import {FC} from "react";
import {Avatar} from "@nextui-org/react";

const bgColors: Record<string, string> = {
  "de": "bg-amber-500",
  "en": "bg-violet-500",
  "bn": "bg-emerald-500",
};

export interface LanguageIconProps {
  text: string;
  textColor?: string;
  animate?: boolean;
}

const TextAvatar: FC<LanguageIconProps> = ({text, textColor, animate}) => {
  const color = textColor ? textColor: null;
  const bgColor = bgColors[text] || "bg-purple-500";
  const animation = animate ? "animate-pulse" : null
  return (
    <Avatar isBordered alt={text} className={`${bgColor} ${color} ${animation} w-6 h-6 mt-0.5`} name={text.toUpperCase()} />
  );
}

export default TextAvatar;
