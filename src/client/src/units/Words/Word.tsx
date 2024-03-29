import {FC} from "react";
import {Card, CardBody, CardHeader, Divider, useDisclosure} from "@nextui-org/react";
import WordCard from "../WordCard/WordCard.tsx";
import {useAppDispatch} from "../../store/hooks.ts";
import {AppDispatch} from "../../store/store.ts";
import ArticlesPOS from "./ArticlesPOS.tsx";

export interface WordProps {
  id: number;
  level: string;
  title: string;
  plural: string;
  language: { code: string };
  articles?: [{ title: string }];
  article?: { title: string };
  parts_of_speech?: [{ title: string }];
  part_of_speech?: { title: string };
  sentence: string;
  notes: [Record<string, string>];
  linked_words: WordProps[];
  translations: WordProps[];
}

export interface WordWithIndexProps {
  index: number;
  word: WordProps;
  addCard?: boolean;
  onPress?: (value: number) => (dispatch: AppDispatch) => void;
}

const Word: FC<WordWithIndexProps> = ({ index, word, addCard, onPress }) => {
  const articles = word.articles ? word.articles : word.article ? [word.article] : undefined;
  const parts_of_speech = word.parts_of_speech ? word.parts_of_speech : word.part_of_speech ? [word.part_of_speech] : undefined;
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const dispatch: AppDispatch = useAppDispatch();
  const handlePress = () => {
    if (onPress) {
      dispatch(onPress(index));
      onOpen();
    }
  };

  return (
    <>
      <Card className="max-w-[400px] shadow-sm shadow-purple-500 dark:bg-zinc-800" isPressable onPress={handlePress}>
        <CardHeader className="flex justify-center my-auto">
          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-center">
              <p className="text-md">{word.title}</p>
            </div>
            {(articles || parts_of_speech) && <ArticlesPOS articles={articles} parts_of_speech={parts_of_speech}/>}
          </div>
        </CardHeader>
        {word.sentence &&
          <>
            <Divider/>
            <CardBody>
              <p className="text-center">{word.sentence}</p>
            </CardBody>
          </>
        }
      </Card>
      {addCard && <WordCard isOpen={isOpen} onOpenChange={onOpenChange}/>}
    </>
  );
}

export default Word;
