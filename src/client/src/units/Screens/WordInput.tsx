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

  const initialPartOfSpeech = partsOfSpeech && partsOfSpeech[0]?.key ? partsOfSpeech[0].key : ''
  const [partOfSpeech, setPartOfSpeech] = useState(initialPartOfSpeech);
  const isNoun = partOfSpeech.toLowerCase() === 'noun';

  const articles = getSelectorChoices(language.articles);
  const articlesComponent = articles && articles[0]?.key ? (
    <Selector label="Articles" defaultKey={articles[0].key} choices={articles} onChange={() => null}/>
  ) : null;

  const handlePartOfSpeechChange = (e: ChangeEvent<HTMLSelectElement>) => setPartOfSpeech(e.target.value);

  return (
    <Card className={shadowColor}>
      <CardHeader className="flex justify-center">
        <Content showAvatar={true} language_code={language.code} content={language.title}/>
      </CardHeader>
      <CardBody className="pt-1">
        <div className="flex flex-wrap gap-2">
          <Input required type="text" label="Word"/>
          <Selector label="Level" defaultKey={levelChoices[0].key} choices={levelChoices} onChange={() => null}/>
          {partsOfSpeech?.length && <Selector label="Parts of Speech" defaultKey={partsOfSpeech[0].key} choices={partsOfSpeech} onChange={handlePartOfSpeechChange}/>}
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
