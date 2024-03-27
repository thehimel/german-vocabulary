import {Card, CardBody, CardHeader, Input} from "@nextui-org/react";
import {ChangeEvent, FC, useEffect, useState} from "react";
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
  const [partOfSpeech, setPartOfSpeech] = useState('');

  useEffect(() => {
    if (partsOfSpeech && partsOfSpeech.length > 0) {
      setPartOfSpeech(partsOfSpeech[0].key);
    }
  }, [partsOfSpeech]);

  const handlePartOfSpeechChange = (e: ChangeEvent<HTMLSelectElement>) => setPartOfSpeech(e.target.value);

  const articles = getSelectorChoices(language.articles);
  const articlesComponent = partOfSpeech.toLowerCase() === 'noun' && articles && articles[0]?.key ? (
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
          {partsOfSpeech?.length && <Selector label="Parts of Speech" defaultKey={partsOfSpeech[0].key} choices={partsOfSpeech} onChange={handlePartOfSpeechChange}/>}
          { articlesComponent }
          <Input type="text" label="Plural"/>
          <Input type="text" label="Sentence"/>
          <Input type="text" label="Note"/>
        </div>
      </CardBody>
      </Card>
  );
}

export default WordInput;
