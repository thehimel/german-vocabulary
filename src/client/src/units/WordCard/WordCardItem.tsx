import {Chip, ModalBody, ModalHeader} from "@nextui-org/react";
import {FC} from "react";
import ArticlesPOS from "../Words/ArticlesPOS.tsx";
import Content from "./Content.tsx";

export interface WordCardItemProps {
  title: string;
  plural: string;
  language: { code: string };
  articles: [{ title: string }];
  parts_of_speech: [{ title: string }];
  sentence: string;
}

const WordCardItem: FC<WordCardItemProps> = ({title, plural, language, articles, parts_of_speech, sentence}) => {
  return (
    <div className="p-4">
      <ModalHeader className="flex flex-col">
        <Content flag={true} language={language.code} content={title}/>
      </ModalHeader>
      <ModalBody>
        <ArticlesPOS articles={articles} parts_of_speech={parts_of_speech}/>
        {plural && (<div><Chip color="warning" variant="shadow"><Content language={language.code} content={plural}/></Chip></div>)}
        <Content language={language.code} content={sentence}/>
      </ModalBody>
    </div>
  );
}

export default WordCardItem;
