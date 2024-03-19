import {FC} from "react";
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import {PressEvent} from "@react-types/shared";
import useDarkMode from "use-dark-mode";
import {CheckIcon} from "@radix-ui/react-icons";

interface CardProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const WordCard: FC<CardProps> = ({ isOpen, onOpenChange }) => {
  const isDarkMode = useDarkMode().value;
  const bgColor = isDarkMode ? 'dark text-gray-50' : '';
  return (
    <>
      <Modal
        isOpen={isOpen}
        placement="center"
        backdrop="blur"
        onOpenChange={onOpenChange}
        className={`${bgColor}`}
        size="xs"
        motionProps={{
          variants: {
            enter: {
              opacity: 0.6,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          }
        }}
      >
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
                <Button isIconOnly radius="full" variant="light" onPress={onClose}>
                  <CheckIcon />
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
