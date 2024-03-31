import {Chip, ModalBody, ModalHeader} from "@nextui-org/react";
import {FC} from "react";
import ArticlesPOS from "../Words/ArticlesPOS.tsx";
import Content from "./Content.tsx";

export interface WordCardItemProps {
  word: {
    title: string;
    plural: string;
    language: { code: string };
    articles?: [{ title: string }];
    part_of_speech?: { title: string };
    sentence: string;
  }
}

const WordCardItem: FC<WordCardItemProps> = ({word}) => {
  return (
    <div className="p-4">
      <ModalHeader className="flex flex-col">
        <Content showAvatar showSpeaker language_code={word.language.code} content={word.title}/>
      </ModalHeader>
      <ModalBody>
        <ArticlesPOS articles={word.articles} parts_of_speech={word.part_of_speech ? [word.part_of_speech] : undefined}/>
        {word.plural && (
          <div>
            <Chip color="warning" variant="shadow" className="animate-appearance-in">
              <Content showSpeaker language_code={word.language.code} content={word.plural}/>
            </Chip>
          </div>
        )}
        <Content showSpeaker language_code={word.language.code} content={word.sentence}/>
      </ModalBody>
    </div>
  );
}

export default WordCardItem;
