import {Card, CardBody} from "@nextui-org/react";
import {Cross2Icon} from "@radix-ui/react-icons";
import {FC, useState} from "react";
import {Message} from "../../store/base/baseSlice.ts";

interface AlertProps {
  message: Message;
}

const Alert: FC<AlertProps> = ({ message  }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {isOpen &&
        <div className="max-w-screen-xl mx-auto pt-2 px-2">
          <Card className="">
            <button
              className="absolute top-2 right-2 z-10 dark:bg-zinc-600 bg-zinc-200 rounded-full m-1 p-1"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Cross2Icon />
            </button>
            <CardBody className={`items-center text-justify px-10 py-6 text-${message.type}`}>
              {message.content}
            </CardBody>
          </Card>
        </div>
      }
    </>
  );
}

export default Alert;
