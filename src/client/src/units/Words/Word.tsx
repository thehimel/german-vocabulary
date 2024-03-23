import {FC} from "react";
import {Card, CardBody, CardHeader, Divider, useDisclosure} from "@nextui-org/react";
import WordCard from "../WordCard/WordCard.tsx";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {AppDispatch} from "../../store/store.ts";
import {wordActions} from "../../store/word/wordSlice.ts";
import ArticlesPOS from "./ArticlesPOS.tsx";

export interface WordProps {
  id: number;
  level: string;
  language: { code: string };
  title: string;
  articles: [{ title: string }];
  parts_of_speech: [{ title: string }];
  sentence: string;
  notes: [Record<string, string>];
  linked_words: WordProps[];
  translations: WordProps[];
}

export interface WordWithIndexProps {
  index: number;
  word: WordProps;
}

const Word: FC<WordWithIndexProps> = ({ index, word }) => {
  const words = useAppSelector((state) => state.words.words);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const dispatch: AppDispatch = useAppDispatch();
  const handlePress = () => {
    dispatch(wordActions.setWord(words[index]));
    onOpen();
  };

  return (
    <>
      <Card className="max-w-[400px] shadow-sm shadow-purple-500" isPressable onPress={handlePress}>
        <CardHeader className="flex justify-center">
          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-center">
              <p className="text-md">{word.title}</p>
            </div>
            <ArticlesPOS word={word}/>
          </div>
        </CardHeader>
        <Divider/>
        <CardBody>
          <p className="text-center">{word.sentence}</p>
        </CardBody>
      </Card>
      <WordCard isOpen={isOpen} onOpenChange={onOpenChange}/>
    </>
  );
}

export default Word;
