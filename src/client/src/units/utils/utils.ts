import {LanguageChoices} from "../../store/base/baseSlice.ts";

export const filterLanguageChoices = (choices: LanguageChoices[], exclude_language: string): LanguageChoices[] => {
  return choices.filter(choice => choice.language !== exclude_language);
};
