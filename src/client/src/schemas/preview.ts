import {z} from "zod";
import {languageChoices} from "../store/base/baseSlice.ts";

const titleSchema = z.string().min(1, "This field is required.");

const levelSchema = z.string()
  .min(1, "This field is required.")
  .min(2, "This field must be at least 2 characters long.");

const partOfSpeechSchema = z.string().min(1, "This field is required.");

const articleSchema = z.string().optional();
const pluralSchema = z.string().optional();
const sentenceSchema = z.string().optional();

export const languageKeys = languageChoices.map(choice => choice.key);
type LanguageCode = typeof languageKeys[number];

const languageCodeSchema = z.enum(languageKeys as [LanguageCode, ...LanguageCode[]]);

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
    words: z.array(wordSchema).optional(),
  });

export type TPreviewSchema = z.infer<typeof previewSchema>;

export const getInitialWordValues = (languageCode: string) => ({
  languageCode,
  title: "",
  level: "",
  partOfSpeech: "",
  article: "",
  plural: "",
  sentence: "",
});

export const initialPreviewValues: TPreviewSchema = {
  languageCode: "",
  title: "",
  // words: ["de", "en", "bn"].map(getInitialWordValues),
};
