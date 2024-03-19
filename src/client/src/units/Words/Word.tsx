import {FC} from "react";
import {Card, CardBody, CardHeader, Chip, Divider} from "@nextui-org/react";

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
  return (
    <Card className="max-w-[400px] shadow-sm shadow-purple-500" isPressable onPress={() => console.log("item pressed")}>
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
  );
}

export default Word;
