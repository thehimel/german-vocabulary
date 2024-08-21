import {zodResolver} from "@hookform/resolvers/zod";
import {Card, CardBody, CardHeader} from "@nextui-org/react";
import React from "react";
import {useForm} from "react-hook-form";
import {TWordSchema, wordSchema} from "../../schemas/preview.ts";
import {Language, levelChoices, SelectorChoice} from "../../store/base/baseSlice.ts";
import {useAppSelector} from "../../store/hooks.ts";
import CustomInput from "../Fields/CustomInput.tsx";
import CustomSelect from "../Fields/CustomSelect.tsx";
import {toggleDarkModeStyleSheet} from "../Selectors/utils.ts";
import {getLanguageStyle, getSelectorChoices} from "../utils/utils.ts";
import Content from "../WordCard/Content.tsx";

interface CreateWordProps {
  language: Language;
  initialValues: TWordSchema;
}

const findValueInCollection = (collection: SelectorChoice[], value: string) => {
    const found = collection.find(item => item.key === value);
    return found ? value : undefined;
};

const CreateWord: React.FC<CreateWordProps> = ({language, initialValues}) => {
  const darkMode = useAppSelector((state) => state.base.darkMode);
  toggleDarkModeStyleSheet(darkMode);

  const parts_of_speech = useAppSelector((state) => state.base.properties.parts_of_speech);
  const partsOfSpeechChoices = getSelectorChoices(parts_of_speech);
  const articleChoices = getSelectorChoices(language.articles);

  const defaultArticle = findValueInCollection(articleChoices, initialValues.article || "");

  const shadowColor = `flex flex-wrap gap-2 pt-2 shadow-sm ${getLanguageStyle(language.code, 'shadow')}`;

  const {
    register,
    formState: {errors, isSubmitting},
    watch,
  } = useForm<TWordSchema>({
    resolver: zodResolver(wordSchema),
    defaultValues: initialValues,
  });

  return (
    <Card className={shadowColor}>
      <CardHeader className="flex justify-center">
        <Content showAvatar={true} language_code={language.code} content={language.title}/>
      </CardHeader>
      <CardBody className="pt-1">
        <div className="flex flex-wrap gap-2">
          <CustomInput
            fields={register("title")}
            value={watch("title")}
            label="Title"
            errorMessage={errors.title?.message}
            isSubmitting={isSubmitting}
          />
          <CustomSelect
            fields={register("level")}
            items={levelChoices}
            value={watch("level")}
            defaultKey={initialValues.level}
            label="Level"
            placeholder={"Select a Level"}
            errorMessage={errors.level?.message}
            isSubmitting={isSubmitting}
          />
          <CustomSelect
            fields={register("partOfSpeech")}
            items={partsOfSpeechChoices}
            value={watch("partOfSpeech")}
            defaultKey={initialValues.partOfSpeech}
            label="Part of Speech"
            placeholder={"Select a Part of Speech"}
            errorMessage={errors.partOfSpeech?.message}
            isSubmitting={isSubmitting}
          />
          {defaultArticle && (
            <CustomSelect
              fields={register("article")}
              items={articleChoices}
              value={watch("article") || ""}
              defaultKey={defaultArticle}
              label="Article"
              placeholder={"Select an Article"}
              errorMessage={errors.article?.message}
              isSubmitting={isSubmitting}
            />
          )}
          {initialValues.plural && (
            <CustomInput
              fields={register("plural")}
              value={watch("plural")}
              label="Plural"
              errorMessage={errors.plural?.message}
              isSubmitting={isSubmitting}
            />
          )}
          <CustomInput
            fields={register("sentence")}
            value={watch("sentence")}
            label="Sentence"
            errorMessage={errors.sentence?.message}
            isSubmitting={isSubmitting}
          />
        </div>
      </CardBody>
    </Card>
  );
}

export default CreateWord;
