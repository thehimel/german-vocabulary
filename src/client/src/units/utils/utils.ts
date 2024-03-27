import {SelectorChoice} from "../../store/base/baseSlice.ts";

export const filterLanguageChoices = (choices: SelectorChoice[], exclude_language: string): SelectorChoice[] => {
  return choices.filter(choice => choice.key !== exclude_language);
};

const languageStyles: Record<string, Record<string, string>> = {
    'de': { bg: 'bg-amber-500', shadow: 'shadow-amber-500' },
    'en': { bg: 'bg-indigo-700', shadow: 'shadow-indigo-700' },
    'bn': { bg: 'bg-emerald-500', shadow: 'shadow-emerald-500' }
};

export const getLanguageStyle = (code: string, type: 'bg' | 'shadow') => {
    const languageCode = code.toLowerCase();
    return languageStyles[languageCode]?.[type] || (type === 'bg' ? 'bg-purple-500' : 'shadow-purple-500');
};
