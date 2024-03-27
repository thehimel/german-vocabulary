import {Card, CardBody, CardHeader, Input} from "@nextui-org/react";
import {ChangeEvent, FC, useState} from "react";
import {Language, levelChoices, SelectorChoice} from "../../store/base/baseSlice.ts";
import Selector from "../Selectors/Selector.tsx";
import {getLanguageStyle, getSelectorChoices} from "../utils/utils.ts";
import Content from "../WordCard/Content.tsx";

interface WordInputProps {
  language: Language,
  partsOfSpeech?: SelectorChoice[];
  articles?: SelectorChoice[];
}

const WordInput: FC<WordInputProps> = ({ language, partsOfSpeech}) => {
  const shadowColor = `flex flex-wrap gap-2 pt-2 shadow-sm ${getLanguageStyle(language.code, 'shadow')}`;

  const initialPartOfSpeech = partsOfSpeech && partsOfSpeech.length > 0 ? partsOfSpeech[0].key : ''
  const [partOfSpeech, setPartOfSpeech] = useState(initialPartOfSpeech);
  const isNoun = partOfSpeech.toLowerCase() === 'noun';

  const handlePartOfSpeechChange = (e: ChangeEvent<HTMLSelectElement>) => setPartOfSpeech(e.target.value);
  const partsOfSpeechComponent = partsOfSpeech && partsOfSpeech.length > 0 ? (
    <Selector label="Parts of Speech" defaultKey={partsOfSpeech[0].key} choices={partsOfSpeech} onChange={handlePartOfSpeechChange}/>
  ) : null;

  const articles = getSelectorChoices(language.articles);
  const articlesComponent = articles && articles.length > 0 ? (
    <Selector label="Articles" defaultKey={articles[0].key} choices={articles} onChange={() => null}/>
  ) : null;

  return (
    <Card className={shadowColor}>
      <CardHeader className="flex justify-center">
        <Content showAvatar={true} language_code={language.code} content={language.title}/>
      </CardHeader>
      <CardBody className="pt-1">
        <div className="flex flex-wrap gap-2">
          <Input required type="text" label="Word"/>
          <Selector label="Level" defaultKey={levelChoices[0].key} choices={levelChoices} onChange={() => null}/>
          {partsOfSpeechComponent}
          { isNoun && articlesComponent }
          { isNoun && <Input type="text" label="Plural"/>}
          <Input type="text" label="Sentence"/>
          <Input type="text" label="Note"/>
        </div>
      </CardBody>
      </Card>
  );
}

export default WordInput;
