def translation_prompt(word, language = None):
    prompt = f"""
        Translate the{ ' '+language if language else ' '}word "{word}" into German, English, and Bengali.

        Output Format:
        Please provide the translation in JSON format without any additional formatting.
        The JSON object should contain a key `translations` that maps to a list of objects.
        Each object in the list should include the following fields:
        
        language_code: The language code for the translation. Use: de for German, en for English, and bn for Bengali.
        
        word: The translated word in the target language.
        
        parts_of_speech: The grammatical category of the word (e.g., noun).
        
        article_singular: The definite or indefinite article used with the word in singular form, if applicable. If not applicable, use "".
        
        plural: The plural form of the word, if applicable. If not applicable, use "".
        
        article_plural: The definite or indefinite article used with the word in plural form, if applicable. If not applicable, use "".
        
        sentence: A simple sentence using the translated word, suitable for a beginner language learner at the CEFR A1 level, that conveys the same meaning across all languages.
        
        level: The CEFR level of the sentence, in lowercase.
    """

    return prompt
