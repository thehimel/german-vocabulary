import {FC} from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";
import { PressEvent } from "@react-types/shared";
import useDarkMode from "use-dark-mode";

interface CardProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const WordCard: FC<CardProps> = ({ isOpen, onOpenChange }) => {
  const isDarkMode = useDarkMode().value;
  const bgColor = isDarkMode ? 'dark text-gray-50' : '';
  return (
    <>
      <Modal isOpen={isOpen} placement="center" backdrop="blur" onOpenChange={onOpenChange} className={`${bgColor}`} size="xs">
        <ModalContent>
          {(onClose: { (e: PressEvent): void; (e: PressEvent): void; }) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <p>
                  This is first line.
                </p>
                <p>
                  This is second line.
                </p>
                <p>
                  This is third line.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default WordCard;
