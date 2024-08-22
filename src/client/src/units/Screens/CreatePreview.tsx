import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {toast} from "sonner";
import {initialPreviewValues, previewSchema, TPreviewSchema, TWordSchema} from "../../schemas/preview.ts";
import {languageChoices} from "../../store/base/baseSlice.ts";
import {useAppSelector} from "../../store/hooks.ts";
import CustomInput from "../Fields/CustomInput.tsx";
import CustomSelect from "../Fields/CustomSelect.tsx";
import SubmitButton from "../Fields/SubmitButton.tsx";
import {toggleDarkModeStyleSheet} from "../Selectors/utils.ts";
import {PREVIEWS_CREATE_API_URL} from "../urls.ts";
import {mapTranslationsToTWordSchema} from "../utils/utils.ts";
import CreateWord from "./CreateWord.tsx";

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
  const [isLoading, setIsLoading] = useState(false);

  const fetchTranslations = async (word: string, languageCode: string) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/translate/word/", { word, language_code: languageCode });
      const translations: TWordSchema[] = mapTranslationsToTWordSchema(response.data.translations);
      setIsLoading(false);
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

  const handleWordUpdate = (index: number, updatedWord: TWordSchema) => {
    setWordValues(prevValues => {
      const updatedValues = [...(prevValues || [])]; // Ensure prevValues is always an array
      updatedValues[index] = updatedWord;
      return updatedValues;
    });
  };

  const createPreview = async (params: TPreviewSchema) => {
    try {
      await axios.post(PREVIEWS_CREATE_API_URL, { ...params });
      toast.success("Thanks for your contribution! The content will now be reviewed by the team!");
    } catch (error: unknown) {  // Error type must be unknown or any
      console.error("Error creating preview:", error);

      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(`Error: ${error.response.data.message || "An error occurred while creating the preview."}`);
        } else if (error.request) {
          toast.error("No response received from the server. Please check your network connection.");
        } else {
          toast.error("An error occurred while setting up the request.");
        }
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  }

  const onSubmit = async (data: TPreviewSchema) => {
    console.log("Form data:", data);
    if (!wordValues?.length) {
      handleWordAndLanguageChange();
    } else {
      const params = {
        title: data.title,
        languageCode: data.languageCode,
        words: wordValues,
      }
      await createPreview(params);
    }
  };

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
          {wordValues && wordValues?.length > 0 && (
            <div className="flex justify-center max-w-screen-xl mx-auto pt-2 ps-2 pe-2">
              <div className="grid md:grid-cols-3 gap-2">
                {wordValues && wordValues.map((wordValue, index) => (
                  <CreateWord
                    key={index}
                    language={languages.find(item => item.code === wordValue.languageCode)!}
                    initialValues={wordValue}
                    onWordUpdate={(updatedWord) => handleWordUpdate(index, updatedWord)}
                  />
                ))}
              </div>
            </div>
          )}
          <SubmitButton
            isDisabled={isSubmitting || isLoading}
            isLoading={isSubmitting || isLoading}
            title={wordValues?.length ? "Submit" : "Fetch Translations"}
            color={"default"}
          />
        </form>
      </div>
    </div>
  );
}

export default CreatePreview;
