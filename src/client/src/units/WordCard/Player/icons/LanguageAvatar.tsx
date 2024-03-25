import {Avatar} from "@nextui-org/react";
import {FC} from "react";

const languageBg: Record<string, string> = {
  "de": "bg-amber-500",
  "en": "bg-emerald-500",
  "bn": "bg-rose-500",
};

export interface LanguageIconProps {
  language_code: string,
}

const LanguageAvatar: FC<LanguageIconProps> = ({language_code}) => {
  const bgColor = languageBg[language_code] || "bg-purple-500";
  return (
    <Avatar isBordered alt={language_code} className={`${bgColor} w-6 h-6 mt-0.5 animate-pulse`} name={language_code.toUpperCase()} />
  );
}

export default LanguageAvatar;
