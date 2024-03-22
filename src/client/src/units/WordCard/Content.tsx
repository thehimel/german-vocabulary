import {FC} from "react";
import Press from "../NavigationBar/Press.tsx";
import {SpeakerLoudIcon} from "@radix-ui/react-icons";
import {Avatar} from "@nextui-org/react";
import {Language} from "../../store/base/baseSlice.ts";


interface ContentProps {
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

const Content: FC<ContentProps> = ({ language, content }) => {
  const imageUrl = `https://flagcdn.com/${getCountryCode(language)}.svg`;
  return (
    <div className="flex justify-center gap-2">
      <Avatar alt={language} className="w-6 h-6" src={imageUrl}/> {content} <Press><SpeakerLoudIcon/></Press>
    </div>
)
  ;
}

export default Content;
