import {LanguageChoice} from "../../store/base/baseSlice.ts";

export const filterLanguageChoices = (choices: LanguageChoice[], exclude_language: string): LanguageChoice[] => {
  return choices.filter(choice => choice.language !== exclude_language);
};
