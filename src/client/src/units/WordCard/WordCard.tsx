import {FC} from "react";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import useDarkMode from "use-dark-mode";
import {CheckIcon, PlayIcon} from "@radix-ui/react-icons";
import Press from "../NavigationBar/Press.tsx";

interface CardProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const WordCard: FC<CardProps> = ({isOpen, onOpenChange}) => {
  const isDarkMode = useDarkMode().value;
  const bgColor = isDarkMode ? 'dark text-gray-50' : '';
  const motionProps = {
    variants: {
      enter: {
        opacity: 1,
        transition: {
          duration: 0.3,
          ease: "easeOut",
        },
      },
      exit: {
        opacity: 0,
        transition: {
          duration: 0.3,
          ease: "easeIn",
        },
      },
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
        className={`${bgColor}`}
        size="xs"
        motionProps={motionProps}
      >
        <ModalContent className="text-center">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 pt-8">Modal Title</ModalHeader>
              <ModalBody>
                <p>This is first line.</p>
                <p>This is second line. <Press><PlayIcon /></Press></p>
                <p>This is third line.</p>
              </ModalBody>
              <ModalFooter>
                <Press onPress={onClose}><CheckIcon /></Press>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default WordCard;
