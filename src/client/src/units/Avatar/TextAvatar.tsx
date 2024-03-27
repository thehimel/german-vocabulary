import {FC} from "react";
import {Avatar} from "@nextui-org/react";
import {useAppSelector} from "../../store/hooks.ts";
import {getLanguageStyle} from "../utils/utils.ts";

export interface LanguageIconProps {
  text: string;
  textColor?: string;
  animate?: boolean;
}

const TextAvatar: FC<LanguageIconProps> = ({text, textColor, animate}) => {
  const darkMode = useAppSelector((state) => state.base.darkMode);
  const color = textColor ? textColor: 'text-gray-50';
  const bgColor = getLanguageStyle(text, 'bg');
  const animation = animate ? "animate-pulse" : null
  return (
    <Avatar isBordered alt={text} className={`${darkMode ? 'dark': ''} ${bgColor} ${color} ${animation} w-6 h-6 mt-0.5`} name={text.toUpperCase()} />
  );
}

export default TextAvatar;
