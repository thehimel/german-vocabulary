import {FC} from "react";
import Press from "../NavigationBar/Press.tsx";
import {SpeakerLoudIcon} from "@radix-ui/react-icons";
import {Avatar} from "@nextui-org/react";
import {Language} from "../../store/base/baseSlice.ts";


interface ContentProps {
  flag?: boolean;
  language: Language;
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
  const speaker = language ? <Press><SpeakerLoudIcon/></Press>: null;
  return (
    <div className="flex justify-center gap-2">
      {avatar} {content} {speaker}
    </div>
  );
}

export default Content;
