import {FC} from "react";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import {CheckIcon, SpeakerLoudIcon} from "@radix-ui/react-icons";
import Press from "../NavigationBar/Press.tsx";
import {useAppSelector} from "../../store/hooks.ts";
import Chips from "../Words/Chips.tsx";

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
        hideCloseButton
        placement="center"
        backdrop="blur"
        onOpenChange={onOpenChange}
        className={`${bgColor} me-5`}
        size="xs"
        motionProps={motionProps}
      >
        <ModalContent className="text-center">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 pt-8">{word.title}</ModalHeader>
              <ModalBody>
                <div className="flex flex-row justify-center gap-1">
                  <Chips items={word.articles} color="secondary" variant="flat"/>
                  <Chips items={word.parts_of_speech} color="secondary" variant="faded"/>
                </div>
                <p>This is second line.
                  <Press>
                    <SpeakerLoudIcon className="ms-1"/>
                  </Press>
                </p>
                <p>{word.sentence}</p>
              </ModalBody>
              <ModalFooter>
                <Press onPress={onClose}>
                  <CheckIcon />
                </Press>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default WordCard;
