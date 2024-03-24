import {FC} from "react";
import {Divider, Modal, ModalBody, ModalContent, ModalHeader} from "@nextui-org/react";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {AppDispatch} from "../../store/store.ts";
import {setCurrentIndex} from "../../store/words/wordsActions.ts";
import PaginationBar from "../NavigationBar/PaginationBar.tsx";
import {WordProps} from "../Words/Word.tsx";
import Content from "./Content.tsx";
import ArticlesPOS from "../Words/ArticlesPOS.tsx";

interface CardProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const WordCard: FC<CardProps> = ({isOpen, onOpenChange}) => {
  const dispatch: AppDispatch = useAppDispatch();
  const words = useAppSelector((state) => state.words.words);
  const currentIndex = useAppSelector((state) => state.words.currentIndex);
  const word: WordProps = words[currentIndex];
  const darkMode = useAppSelector((state) => state.base.darkMode);
  const bgColor = darkMode ? 'dark text-gray-50' : '';
  const motionProps = {
    variants: {
      enter: {opacity: 1, transition: {duration: 0.3, ease: "easeOut"}},
      exit: {opacity: 0, transition: {duration: 0.3, ease: "easeIn"}},
    }
  }
  const translation = {
    language: {code: word.translations?.[0]?.language?.code},
    title: word.translations?.[0]?.title,
    sentence: word.translations?.[0]?.sentence,
    articles: word.translations?.[0]?.articles,
    parts_of_speech: word.translations?.[0]?.parts_of_speech,
  }

  const handlePageChange = (value: number) => dispatch(setCurrentIndex(value-1));

  return (
    <>
      <Modal
        isOpen={isOpen}
        isDismissable={false}
        placement="center"
        backdrop="blur"
        onOpenChange={onOpenChange}
        className={`${bgColor} p-4 pb-6`}
        size="xs"
        motionProps={motionProps}
      >
        <ModalContent className="flex items-center text-center">
          <ModalHeader className="flex flex-col">
            <Content flag={true} language={word.language.code} content={word.title}/>
          </ModalHeader>
          <ModalBody>
            <ArticlesPOS articles={word.articles} parts_of_speech={word.parts_of_speech}/>
            <Content language={word.language.code} content={word.sentence}/>
          </ModalBody>
          {translation.title && (
            <>
              <Divider className="mt-2" />
              <ModalHeader className="flex flex-col pt-6">
                <Content flag={true} language={translation.language.code} content={translation.title} />
              </ModalHeader>
              <ModalBody>
                <ArticlesPOS articles={translation.articles} parts_of_speech={translation.parts_of_speech}/>
                <Content language={translation.language.code} content={translation.sentence} />
              </ModalBody>
            </>
          )}
          <PaginationBar initialPage={1} total={words.length} onChange={handlePageChange}/>
        </ModalContent>
      </Modal>
    </>
  );
}

export default WordCard;
