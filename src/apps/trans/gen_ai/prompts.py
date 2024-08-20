def translation_prompt(word, language = None):
    prompt = f"""
        Translate the{ ' '+language if language else ' '}word "{word}" into German, English, and Bengali.

        Output Format: Provide the translation in JSON format.
        The JSON object should have a key translations which maps to a list of objects.
        Each object in the list should include the following fields:

        language_code: The language code for the translation.
          Use: de for German, en for English, bn for Bengali.

        word: The translated word in the target language.

        parts_of_speech: The part of speech for the word (e.g., noun).

        article_singular: The definite or indefinite article used with the word in singular form, if applicable.

        plural: The plural form of the word, if applicable.

        article_plural: The definite or indefinite article used with the word in plural form, if applicable.

        sentence: A simple sentence using the translated word that conveys the same meaning across all languages.
          The sentence should be easy to understand and suitable for a beginner language learner (CEFR level A1).

        level: The Common European Framework of Reference for Languages (CEFR) level for the sentence.
    """

    return prompt
