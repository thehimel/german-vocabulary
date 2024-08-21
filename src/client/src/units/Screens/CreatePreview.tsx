import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {initialPreviewValues, previewSchema, TPreviewSchema} from "../../schemas/preview.ts";
import CustomInput from "../Fields/CustomInput.tsx";
import SubmitButton from "../Fields/SubmitButton.tsx";

const CreatePreview = () => {
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
      <CustomInput
        fields={register("languageCode")}
        value={watch("languageCode")}
        label="Language Code"
        errorMessage={errors.languageCode?.message}
        isSubmitting={isSubmitting}
      />
      <SubmitButton isDisabled={isSubmitting} isLoading={isSubmitting} title={"Submit"} color={"default"} />
    </form>
  );
}

export default CreatePreview;
