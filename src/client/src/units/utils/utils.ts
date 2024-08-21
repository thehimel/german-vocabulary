import {TWordSchema} from "../../schemas/preview.ts";
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


export const getSelectorChoices = (items: { title: string }[]): SelectorChoice[] => {
    const choices: SelectorChoice[] = [];

    items.forEach(item => {
        choices.push({ key: item.title.toLowerCase(), label: item.title });
    });

    return choices;
}

export const getCookie = (name: string) => {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : '';
}

export interface Translation {
  language_code: string;
  word: string;
  level: string;
  parts_of_speech: string;
  article_singular: string;
  plural: string;
  sentence: string;
}

export const mapTranslationsToTWordSchema = (translations: Translation[]): TWordSchema[] => {
  return translations.map((translation) => ({
    languageCode: translation.language_code,
    title: translation.word,
    level: translation.level,
    partOfSpeech: translation.parts_of_speech,
    article: translation.article_singular || "",
    plural: translation.plural || "",
    sentence: translation.sentence || "",
  }));
};
