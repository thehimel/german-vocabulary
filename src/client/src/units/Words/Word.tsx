import {FC} from "react";
import {Card, CardBody, CardHeader, Chip, Divider, useDisclosure} from "@nextui-org/react";
import WordCard from "../WordCard/WordCard.tsx";

interface WordItemProps {
  item: {
    title: string;
    sentence: string;
    article: string;
    parts_of_speech: string;
    level: string;
  };
}

const Word: FC<WordItemProps> = ({ item }) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Card className="max-w-[400px] shadow-sm shadow-purple-500" isPressable onPress={onOpen}>
        <CardHeader className="flex justify-center">
          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-center">
              <p className="text-md">{item.title}</p>
            </div>
            <div className="flex flex-row gap-3">
              <div className="flex flex-col">
                <Chip color="secondary" variant="flat">{item.article}</Chip>
              </div>
              <div className="flex flex-col">
                <Chip color="secondary" variant="faded">{item.parts_of_speech}</Chip>
              </div>
            </div>
          </div>
        </CardHeader>
        <Divider/>
        <CardBody>
          <p className="text-center">{item.sentence}</p>
        </CardBody>
      </Card>
      <WordCard isOpen={isOpen} onOpenChange={onOpenChange}/>
    </>
  );
}

export default Word;
