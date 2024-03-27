import {FC} from "react";
import TextAvatar from "../Avatar/TextAvatar.tsx";
import Player from "./Player/Player.tsx";


interface ContentProps {
  showAvatar?: boolean;
  showSpeaker?: boolean;
  language_code: string;
  content?: string;
}

const Content: FC<ContentProps> = ({ showAvatar, language_code, content, showSpeaker,  }) => {
  const avatar = showAvatar ? <TextAvatar text={language_code} animate={true}/> : null;
  const speaker = showSpeaker && content ? <Player text={content} language={language_code}/>: null;
  return (
    <div className="flex justify-center gap-2">
      {avatar} <div>{content} {speaker}</div>
    </div>
  );
}

export default Content;
