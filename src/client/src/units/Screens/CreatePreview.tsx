import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {initialPreviewValues, languageKeys, previewSchema, TPreviewSchema} from "../../schemas/preview.ts";
import {languageChoices} from "../../store/base/baseSlice.ts";
import {useAppSelector} from "../../store/hooks.ts";
import CustomInput from "../Fields/CustomInput.tsx";
import CustomSelect from "../Fields/CustomSelect.tsx";
import SubmitButton from "../Fields/SubmitButton.tsx";
import {toggleDarkModeStyleSheet} from "../Selectors/utils.ts";

const CreatePreview = () => {
  const darkMode = useAppSelector((state) => state.base.darkMode);
  toggleDarkModeStyleSheet(darkMode);

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    watch,
  } = useForm<TPreviewSchema>({
    resolver: zodResolver(previewSchema),
    defaultValues: initialPreviewValues,
  });

  const onSubmit = async (data: TPreviewSchema) => {
    console.log("Form data:", data);
  };

  console.log(errors);

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
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
        defaultKey={languageKeys[0]}
      />
      <SubmitButton isDisabled={isSubmitting} isLoading={isSubmitting} title={"Submit"} color={"default"} />
    </form>
  );
}

export default CreatePreview;
