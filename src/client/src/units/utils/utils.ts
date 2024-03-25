import {SelectorChoice} from "../../store/base/baseSlice.ts";

export const filterLanguageChoices = (choices: SelectorChoice[], exclude_language: string): SelectorChoice[] => {
  return choices.filter(choice => choice.key !== exclude_language);
};
