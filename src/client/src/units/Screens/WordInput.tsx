import {Card, CardBody, CardHeader, Input} from "@nextui-org/react";
import {FC, ChangeEvent} from "react";
import {Language} from "../../store/base/baseSlice.ts";
import Selector from "../Selectors/Selector.tsx";
import {getLanguageStyle, getSelectorChoices} from "../utils/utils.ts";
import Content from "../WordCard/Content.tsx";
import {Preview} from "./AddPreview.tsx";

interface WordInputProps {
  formData: Record<string, string>;
  index: number;
  language: Language;
  isNoun: boolean;
  onChange: (index: number, event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
  preview: Preview;
}

const WordInput: FC<WordInputProps> = ({ formData, index, language, isNoun, onChange, preview}) => {
  const shadowColor = `flex flex-wrap gap-2 pt-2 shadow-sm ${getLanguageStyle(language.code, 'shadow')}`;
  const isWordDisabled = preview.language.code === language.code;
  const isArticleDisabled = !!(preview.language.code === language.code && preview.article);
  const articles = getSelectorChoices(language.articles);
  const articlesComponent = articles && articles.length > 0 ? (
    <Selector isRequired isDisabled={isArticleDisabled} name="article" label="Article" value={formData.article} defaultKey={formData.article} choices={articles} onChange={(e) => onChange(index, e)}/>
  ) : null;

  return (
    <Card className={shadowColor}>
      <CardHeader className="flex justify-center">
        <Content showAvatar={true} language_code={language.code} content={language.title}/>
      </CardHeader>
      <CardBody className="pt-1">
        <div className="flex flex-wrap gap-2">
          <Input isRequired required isDisabled={isWordDisabled} type="text" name="title" label="Word" value={formData.title} onChange={(e) => onChange(index, e)}/>
          { isNoun && articlesComponent }
          { isNoun && <Input isRequired={language.code === 'de' || language.code === 'en'} name="plural" type="text" label="Plural" value={formData.plural} onChange={(e) => onChange(index, e)}/>}
          <Input isRequired name="sentence" type="text" label="Sentence" value={formData.sentence} onChange={(e) => onChange(index, e)}/>
        </div>
      </CardBody>
    </Card>
  );
}

export default WordInput;
