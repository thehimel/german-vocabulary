import {Input} from "@nextui-org/react";
import {FC} from "react";
import {levelChoices, SelectorChoice} from "../../store/base/baseSlice.ts";
import Selector from "../Selectors/Selector.tsx";

interface WordInputProps {
  partsOfSpeech?: SelectorChoice[];
  articles?: SelectorChoice[];
}

const WordInput: FC<WordInputProps> = ({ partsOfSpeech, articles}) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Input required type="text" label="Word"/>
      <Selector label="Level" defaultKey={levelChoices[0].key} choices={levelChoices} onChange={() => null}/>
      {partsOfSpeech && <Selector label="Parts of Speech" defaultKey={partsOfSpeech[0].key} choices={partsOfSpeech} onChange={() => null}/>}
      {articles && <Selector label="Articles" defaultKey={articles[0].key} choices={articles} onChange={() => null}/>}
      <Input type="text" label="Plural"/>
      <Input type="text" label="Sentence"/>
      <Input type="text" label="Note"/>
    </div>
  );
}

export default WordInput;
