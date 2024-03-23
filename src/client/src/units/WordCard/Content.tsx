import {FC} from "react";
import {Avatar} from "@nextui-org/react";
import Player from "./Player/Player.tsx";


interface ContentProps {
  flag?: boolean;
  language: string;
  content: string;
}

function getCountryCode(language: string): string | undefined {
  const countryCodeMap: Record<string, string> = {
    "de": "de",
    "en": "us",
    "bn": "bd",
  };

  return countryCodeMap[language];
}

const Content: FC<ContentProps> = ({ flag, language, content }) => {
  const avatar = flag ? <Avatar alt={language} className="w-6 h-6" src={`https://flagcdn.com/${getCountryCode(language)}.svg`} /> : null;
  const speaker = language ? <Player text={content} language={language}/>: null;
  return (
    <div className="flex justify-center gap-2">
      {avatar} <div>{content} {speaker}</div>
    </div>
  );
}

export default Content;
