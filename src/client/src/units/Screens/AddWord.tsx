import {Card, CardBody} from "@nextui-org/react";
import WordInput from "./WordInput.tsx";

const AddWord = () => {
  const articles = [
    {key: 'der', label: 'der'},
    {key: 'die', label: 'die'},
    {key: 'das', label: 'das'},
  ]
  const partsOfSpeech = [
    {key: 'noun', label: 'Noun'},
    {key: 'pronoun', label: 'Pronoun'},
    {key: 'verb', label: 'Verb'},
  ]
  return (
    <>
      <div className="flex justify-center mx-auto max-w-screen-xl gap-2 pt-5 ps-2 pe-2">
        <Card className="w-full dark:bg-violet-900 shadow-sm p-4">
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
