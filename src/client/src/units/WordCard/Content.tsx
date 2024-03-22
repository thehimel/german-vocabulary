import {FC} from "react";
import Press from "../NavigationBar/Press.tsx";
import {SpeakerLoudIcon} from "@radix-ui/react-icons";


interface LineProps {
  content: string;
}

const Content: FC<LineProps> = ({ content }) => {
  return (
    <div>{content} <Press><SpeakerLoudIcon className="ms-1"/></Press></div>
  );
}

export default Content;
