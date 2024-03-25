import {FC} from "react";
import LanguageAvatar from "./Player/icons/LanguageAvatar.tsx";
import Player from "./Player/Player.tsx";


interface ContentProps {
  showAvatar?: boolean;
  language_code: string;
  content: string;
}

const Content: FC<ContentProps> = ({ showAvatar, language_code, content }) => {
  const avatar = showAvatar ? <LanguageAvatar language_code={language_code}/> : null;
  const speaker = language_code ? <Player text={content} language={language_code}/>: null;
  return (
    <div className="flex justify-center gap-2">
      {avatar} <div>{content} {speaker}</div>
    </div>
  );
}

export default Content;
