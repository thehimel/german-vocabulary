import { FC } from 'react';
import {Card, CardHeader, CardBody, Divider, Chip} from "@nextui-org/react";

interface CardItemProps {
  item: {
    title: string;
    sentence: string;
    article: string;
    parts_of_speech: string;
    level: string;
  };
}

const CardItem: FC<CardItemProps> = ({ item }) => {
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

export default function Cards() {
  const list = [
    {
      title: "Ansehen",
      sentence: "Sein Ansehen in der Schule ist sehr hoch.",
      article: "das",
      parts_of_speech: "noun",
      level: "a1",
    },
    {
      title: "Ansehen",
      sentence: "Sein Ansehen in der Schule ist sehr hoch.",
      article: "das",
      parts_of_speech: "noun",
      level: "a1",
    },
    {
      title: "Ansehen",
      sentence: "Sein Ansehen in der Schule ist sehr hoch.",
      article: "das",
      parts_of_speech: "noun",
      level: "a1",
    },
    {
      title: "Ansehen",
      sentence: "Sein Ansehen in der Schule ist sehr hoch.",
      article: "das",
      parts_of_speech: "noun",
      level: "a1",
    },
    {
      title: "Ansehen",
      sentence: "Sein Ansehen in der Schule ist sehr hoch.",
      article: "das",
      parts_of_speech: "noun",
      level: "a1",
    },
    {
      title: "Ansehen",
      sentence: "Sein Ansehen in der Schule ist sehr hoch.",
      article: "das",
      parts_of_speech: "noun",
      level: "a1",
    },
    {
      title: "Ansehen",
      sentence: "Sein Ansehen in der Schule ist sehr hoch.",
      article: "das",
      parts_of_speech: "noun",
      level: "a1",
    },
    {
      title: "Ansehen",
      sentence: "Sein Ansehen in der Schule ist sehr hoch. Sein Ansehen in der Schule ist sehr hoch.",
      article: "das",
      parts_of_speech: "noun",
      level: "a1",
    },
  ];

  return (
    <div className="flex justify-center">
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 m-2">
        {list.map((item, index) => (
          <CardItem key={index} item={item}/>
        ))}
      </div>
    </div>
  );
}
