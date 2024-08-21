import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { previewSchema, TPreviewSchema, TWordSchema } from "../../schemas/preview.ts";

const Form: React.FC = () => {
  const [words, setWords] = useState<TWordSchema[]>([]);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<TPreviewSchema>({
    resolver: zodResolver(previewSchema),
  });

  const onSubmit: SubmitHandler<TPreviewSchema> = async (data) => {
    try {
      if (words.length === 0) {
        const response = await axios.get<TWordSchema[]>(`/api/words?title=${data.title}&languageCode=${data.languageCode}`);
        setWords(response.data);
      } else {
        await axios.post("/api/words", { ...data, words });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("title")}
        isRequired
        label="Title"
        variant="bordered"
        isInvalid={!!errors.title?.message}
        errorMessage={errors.title?.message}
        isDisabled={isSubmitting}
      />

      <Input
        {...register("languageCode")}
        isRequired
        label="Language Code"
        variant="bordered"
        isInvalid={!!errors.languageCode?.message}
        errorMessage={errors.languageCode?.message}
        isDisabled={isSubmitting}
      />

      {words.length > 0 && words.map((word, index) => (
        <div key={index}>
          <h3>Language: {word.languageCode}</h3>

          <Input
            {...register(`words.${index}.title`)}
            label="Title"
            variant="bordered"
            defaultValue={word.title || ""}
            isInvalid={!!errors.words?.[index]?.title?.message}
            errorMessage={errors.words?.[index]?.title?.message}
            isDisabled={isSubmitting}
          />

          <Input
            {...register(`words.${index}.partOfSpeech`)}
            label="Part of Speech"
            variant="bordered"
            defaultValue={word.partOfSpeech || ""}
            isInvalid={!!errors.words?.[index]?.partOfSpeech?.message}
            errorMessage={errors.words?.[index]?.partOfSpeech?.message}
            isDisabled={isSubmitting}
          />

          <Input
            {...register(`words.${index}.article`)}
            label="Article"
            variant="bordered"
            defaultValue={word.article || ""}
            isInvalid={!!errors.words?.[index]?.article?.message}
            errorMessage={errors.words?.[index]?.article?.message}
            isDisabled={isSubmitting}
          />

          <Input
            {...register(`words.${index}.plural`)}
            label="Plural"
            variant="bordered"
            defaultValue={word.plural || ""}
            isInvalid={!!errors.words?.[index]?.plural?.message}
            errorMessage={errors.words?.[index]?.plural?.message}
            isDisabled={isSubmitting}
          />

          <Input
            {...register(`words.${index}.sentence`)}
            label="Sentence"
            variant="bordered"
            defaultValue={word.sentence || ""}
            isInvalid={!!errors.words?.[index]?.sentence?.message}
            errorMessage={errors.words?.[index]?.sentence?.message}
            isDisabled={isSubmitting}
          />

          <Input
            {...register(`words.${index}.level`)}
            label="Level"
            variant="bordered"
            defaultValue={word.level || ""}
            isInvalid={!!errors.words?.[index]?.level?.message}
            errorMessage={errors.words?.[index]?.level?.message}
            isDisabled={isSubmitting}
          />
        </div>
      ))}

      <Button
        className="w-full"
        type="submit"
        color="default"
        disabled={isSubmitting}
      >
        {words.length === 0 ? "Fetch Words" : "Submit Updates"}
      </Button>
    </form>
  );
};

export default Form;
