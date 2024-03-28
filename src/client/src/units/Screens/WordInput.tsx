import {Card, CardBody, CardHeader, Input} from "@nextui-org/react";
import {ChangeEvent, FC, useState} from "react";
import {Language, levelChoices, SelectorChoice} from "../../store/base/baseSlice.ts";
import Selector from "../Selectors/Selector.tsx";
import {getLanguageStyle, getSelectorChoices} from "../utils/utils.ts";
import Content from "../WordCard/Content.tsx";

interface WordInputProps {
  formData: Record<string, string>;
  index: number;
  language: Language;
  partsOfSpeech?: SelectorChoice[];
  onChange: (index: number, event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
}

const WordInput: FC<WordInputProps> = ({ formData, index, language, partsOfSpeech, onChange}) => {
  const shadowColor = `flex flex-wrap gap-2 pt-2 shadow-sm ${getLanguageStyle(language.code, 'shadow')}`;

  const initialPartOfSpeech = partsOfSpeech && partsOfSpeech.length > 0 ? partsOfSpeech[0].key : ''
  const [partOfSpeech, setPartOfSpeech] = useState(initialPartOfSpeech);
  const isNoun = partOfSpeech.toLowerCase() === 'noun';

  const handlePartOfSpeechChange = (e: ChangeEvent<HTMLSelectElement>) => setPartOfSpeech(e.target.value);
  const partsOfSpeechComponent = partsOfSpeech && partsOfSpeech.length > 0 ? (
    <Selector name="partOfSpeech" label="Part of Speech" value={formData.partOfSpeech} defaultKey={formData.partOfSpeech} choices={partsOfSpeech} onChange={(e) => {handlePartOfSpeechChange(e); onChange(index, e)}} />
  ) : null;

  const articles = getSelectorChoices(language.articles);
  const articlesComponent = articles && articles.length > 0 ? (
    <Selector name="article" label="Article" value={formData.article} defaultKey={formData.article} choices={articles} onChange={(e) => onChange(index, e)}/>
  ) : null;

  return (
    <Card className={shadowColor}>
      <CardHeader className="flex justify-center">
        <Content showAvatar={true} language_code={language.code} content={language.title}/>
      </CardHeader>
      <CardBody className="pt-1">
        <div className="flex flex-wrap gap-2">
          <Input required type="text" name="word" label="Word" value={formData.word} onChange={(e) => onChange(index, e)}/>
          <Selector name="level" label="Level" value={formData.level} defaultKey={formData.level} choices={levelChoices} onChange={(e) => onChange(index, e)}/>
          {partsOfSpeechComponent}
          { isNoun && articlesComponent }
          { isNoun && <Input name="plural" type="text" label="Plural" onChange={(e) => onChange(index, e)}/>}
          <Input name="sentence" type="text" label="Sentence" value={formData.sentence} onChange={(e) => onChange(index, e)}/>
          <Input name="note" type="text" label="Note" value={formData.note} onChange={(e) => onChange(index, e)}/>
        </div>
      </CardBody>
    </Card>
  );
}

export default WordInput;
