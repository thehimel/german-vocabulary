import {FC} from "react";
import {Divider, Modal, ModalBody, ModalContent, ModalHeader} from "@nextui-org/react";
import {useAppSelector} from "../../store/hooks.ts";
import Content from "./Content.tsx";
import ArticlesPOS from "../Words/ArticlesPOS.tsx";

interface CardProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const WordCard: FC<CardProps> = ({isOpen, onOpenChange}) => {
  const word = useAppSelector((state) => state.word.word);
  const darkMode = useAppSelector((state) => state.base.darkMode);
  const bgColor = darkMode ? 'dark text-gray-50' : '';
  const motionProps = {
    variants: {
      enter: {opacity: 1, transition: {duration: 0.3, ease: "easeOut"}},
      exit: {opacity: 0, transition: {duration: 0.3, ease: "easeIn"}},
    }
  }
  const translation = {
    language: word.translations?.[0]?.language?.code,
    title: word.translations?.[0]?.title,
    sentence: word.translations?.[0]?.sentence
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        placement="center"
        backdrop="blur"
        onOpenChange={onOpenChange}
        className={`${bgColor} p-4 pb-6`}
        size="xs"
        motionProps={motionProps}
      >
        <ModalContent className="text-center">
          <ModalHeader className="flex flex-col">
            <Content flag={true} language={word.language.code} content={word.title}/>
          </ModalHeader>
          <ModalBody>
            <ArticlesPOS word={word}/>
            <Content language={word.language.code} content={word.sentence}/>
          </ModalBody>
          {translation.title && (
            <>
              <Divider className="mt-2" />
              <ModalHeader className="flex flex-col pt-6">
                <Content flag={true} language={translation.language} content={translation.title} />
              </ModalHeader>
              <Content language={translation.language} content={translation.sentence} />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default WordCard;
