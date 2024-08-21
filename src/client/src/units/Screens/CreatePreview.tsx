import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {initialPreviewValues, previewSchema, TPreviewSchema, TWordSchema} from "../../schemas/preview.ts";
import {languageChoices} from "../../store/base/baseSlice.ts";
import {useAppSelector} from "../../store/hooks.ts";
import CustomInput from "../Fields/CustomInput.tsx";
import CustomSelect from "../Fields/CustomSelect.tsx";
import SubmitButton from "../Fields/SubmitButton.tsx";
import {toggleDarkModeStyleSheet} from "../Selectors/utils.ts";
import CreateWord from "./CreateWord.tsx";

interface Translation {
  language_code: string;
  word: string;
  level: string;
  parts_of_speech: string;
  article_singular: string;
  plural: string;
  sentence: string;
}

const CreatePreview = () => {
  const darkMode = useAppSelector((state) => state.base.darkMode);
  toggleDarkModeStyleSheet(darkMode);

  const languages = useAppSelector((state) => state.base.properties.languages);

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    watch,
  } = useForm<TPreviewSchema>({
    resolver: zodResolver(previewSchema),
    defaultValues: initialPreviewValues,
  });

  const [wordValues, setWordValues] = useState<TPreviewSchema["words"]>([]);

  const onSubmit = async (data: TPreviewSchema) => {
    console.log("Form data:", data);
    handleWordAndLanguageChange();
  };

  const fetchTranslations = async (word: string, languageCode: string) => {
    try {
      const response = await axios.post("/api/translate/word/", { word, language_code: languageCode });
      const translations: TWordSchema[] = response.data.translations.map((translation: Translation) => ({
        languageCode: translation.language_code,
        title: translation.word,
        level: translation.level,
        partOfSpeech: translation.parts_of_speech,
        article: translation.article_singular,
        plural: translation.plural,
        sentence: translation.sentence,
      }));
      setWordValues(translations);
    } catch (error) {
      console.error("Error fetching translations:", error);
    }
  };

  const handleWordAndLanguageChange = () => {
    const word = watch("title");
    const languageCode = watch("languageCode");
    if (word && languageCode) {
      fetchTranslations(word, languageCode).then(() => null);
    }
  };

  console.log(errors);

  return (
    <div className="flex justify-center max-w-screen-xl mx-auto pt-2 ps-2 pe-2">
      <div className="flex w-full gap-2">
        <form className="flex flex-col gap-3 w-full" onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            fields={register("title")}
            value={watch("title")}
            label="Title"
            errorMessage={errors.title?.message}
            isSubmitting={isSubmitting}
          />
          <CustomSelect
            fields={register("languageCode")}
            items={languageChoices}
            value={watch("languageCode")}
            label="Language"
            placeholder={"Select Language"}
            errorMessage={errors.languageCode?.message}
            isSubmitting={isSubmitting}
            showAvatar
          />
          {wordValues && wordValues.map((wordValue, index) => (
            <CreateWord
              key={index}
              language={languages.find(item => item.code === wordValue.languageCode)!}
              initialValues={wordValue}
            />
          ))}
          <SubmitButton isDisabled={isSubmitting} isLoading={isSubmitting} title={"Submit"} color={"default"}/>
        </form>
      </div>
    </div>
  );
}

export default CreatePreview;
