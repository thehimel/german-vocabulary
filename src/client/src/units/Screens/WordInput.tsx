import {Card, CardBody, CardHeader, Input} from "@nextui-org/react";
import {FC, ChangeEvent} from "react";
import {Language} from "../../store/base/baseSlice.ts";
import Selector from "../Selectors/Selector.tsx";
import {getLanguageStyle, getSelectorChoices} from "../utils/utils.ts";
import Content from "../WordCard/Content.tsx";

interface WordInputProps {
  formData: Record<string, string>;
  index: number;
  language: Language;
  isNoun: boolean;
  onChange: (index: number, event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
}

const WordInput: FC<WordInputProps> = ({ formData, index, language, isNoun, onChange}) => {
  const shadowColor = `flex flex-wrap gap-2 pt-2 shadow-sm ${getLanguageStyle(language.code, 'shadow')}`;

  const articles = getSelectorChoices(language.articles);
  const articlesComponent = articles && articles.length > 0 ? (
    <Selector isRequired name="article" label="Article" value={formData.article} defaultKey={formData.article} choices={articles} onChange={(e) => onChange(index, e)}/>
  ) : null;

  return (
    <Card className={shadowColor}>
      <CardHeader className="flex justify-center">
        <Content showAvatar={true} language_code={language.code} content={language.title}/>
      </CardHeader>
      <CardBody className="pt-1">
        <div className="flex flex-wrap gap-2">
          <Input isRequired required type="text" name="word" label="Word" value={formData.word} onChange={(e) => onChange(index, e)}/>
          { isNoun && articlesComponent }
          { isNoun && <Input isRequired name="plural" type="text" label="Plural" value={formData.plural} onChange={(e) => onChange(index, e)}/>}
          <Input isRequired name="sentence" type="text" label="Sentence" value={formData.sentence} onChange={(e) => onChange(index, e)}/>
          <Input name="note" type="text" label="Note" value={formData.note} onChange={(e) => onChange(index, e)}/>
        </div>
      </CardBody>
    </Card>
  );
}

export default WordInput;
