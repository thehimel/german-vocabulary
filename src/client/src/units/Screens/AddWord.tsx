import {Card, CardBody} from "@nextui-org/react";
import {useAppSelector} from "../../store/hooks.ts";
import {getSelectorChoices} from "../utils/utils.ts";
import WordInput from "./WordInput.tsx";

const AddWord = () => {
  const parts_of_speech = useAppSelector((state) => state.base.properties.parts_of_speech);
  const partsOfSpeech = getSelectorChoices(parts_of_speech);
  const articles = [
    {key: 'der', label: 'der'},
    {key: 'die', label: 'die'},
    {key: 'das', label: 'das'},
  ]
  return (
    <>
      <div className="flex justify-center mx-auto max-w-screen-xl gap-2 pt-2 ps-2 pe-2">
        <Card className="w-full shadow-sm shadow-purple-500 p-4">
          <CardBody>
            <p className="flex justify-center">Adding the Word: Ansehen</p>
          </CardBody>
        </Card>
      </div>
      <div className="flex justify-center mx-auto max-w-screen-xl gap-2 pt-2 ps-2 pe-2">
        <div className="grid md:grid-cols-3 gap-2">
          <WordInput language="de" partsOfSpeech={partsOfSpeech} articles={articles}/>
          <WordInput language="en" partsOfSpeech={partsOfSpeech} articles={articles}/>
          <WordInput language="bn" partsOfSpeech={partsOfSpeech} articles={articles}/>
        </div>
      </div>
    </>
  );
}

export default AddWord;
