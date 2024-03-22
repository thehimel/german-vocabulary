import {FC} from "react";
import {Divider, Modal, ModalBody, ModalContent, ModalHeader} from "@nextui-org/react";
import {useAppSelector} from "../../store/hooks.ts";
import Chips from "../Words/Chips.tsx";
import Content from "./Content.tsx";

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
  return (
    <>
      <Modal
        isOpen={isOpen}
        placement="center"
        backdrop="blur"
        onOpenChange={onOpenChange}
        className={`${bgColor} p-4 pb-6 me-5`}
        size="xs"
        motionProps={motionProps}
      >
        <ModalContent className="text-center">
          {() => (
            <>
              <ModalHeader className="flex flex-col">
                <Content content={word.title}/>
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-row justify-center gap-1">
                  <Chips items={word.articles} color="secondary" variant="flat"/>
                  <Chips items={word.parts_of_speech} color="secondary" variant="faded"/>
                </div>
                <Content content={word.sentence}/>
              </ModalBody>
              <Divider className="mt-2" />
              <ModalHeader className="flex flex-col pt-6">
                <Content content={word.translations?.[0].title}/>
              </ModalHeader>
              <Content content={word.translations?.[0].sentence}/>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default WordCard;
