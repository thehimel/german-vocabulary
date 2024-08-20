def translation_prompt(word, language = None):
    prompt = f"""
        Translate the{ ' '+language if language else ' '}word "{word}" into German and English.

        Output Format:
        Provide the translation in JSON format.
        The JSON object should have a key translations which maps to a list of objects.
        Each object in the list should include the following fields:
        
        language_code: The language code for the translation. Use: de for German, en for English.
        
        word: The translated word in the target language.
        
        parts_of_speech: The grammatical category of the word (e.g., noun).
        
        article_singular: The definite or indefinite article used with the word in singular form, if applicable. If not applicable, use "".
        
        plural: The plural form of the word, if applicable. If not applicable, use "".
        
        article_plural: The definite or indefinite article used with the word in plural form, if applicable. If not applicable, use "".
        
        sentence: A simple sentence using the translated word, suitable for a beginner language learner at the CEFR A1 level, that conveys the same meaning across all languages.
        
        level: The CEFR level of the sentence, in lowercase.
    """

    return prompt
