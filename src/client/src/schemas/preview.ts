import {z} from "zod";

const languageCodeSchema = z.string()
  .min(1, "This field is required.")
  .min(2, "This field must be at least 2 characters long.");

const titleSchema = z.string().min(1, "This field is required.");

const levelSchema = z.string()
  .min(1, "This field is required.")
  .min(2, "This field must be at least 2 characters long.");

const partOfSpeechSchema = z.string().min(1, "This field is required.");

const articleSchema = z.string().optional();
const pluralSchema = z.string().optional();
const sentenceSchema = z.string().optional();

export const wordSchema = z
  .object({
    languageCode: languageCodeSchema,
    title: titleSchema,
    level: levelSchema,
    partOfSpeech: partOfSpeechSchema,
    article: articleSchema,
    plural: pluralSchema,
    sentence: sentenceSchema,
  });

export type TWordSchema = z.infer<typeof wordSchema>;

export const previewSchema = z
  .object({
    languageCode: languageCodeSchema,
    title: titleSchema,
    words: z.array(wordSchema),
  });

export type TPreviewSchema = z.infer<typeof previewSchema>;
