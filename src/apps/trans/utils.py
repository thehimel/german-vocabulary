from googletrans import Translator as GoogleTranslator


class Translator:
    def __init__(self, src="auto", dest="en"):
        self.src = src
        self.dest = dest
        self.translator = GoogleTranslator()

    def translate(self, text, src=None, dest=None):
        if not src:
            src = self.src
        if not dest:
            dest = self.dest
        return self.translator.translate(text, src=src, dest=dest).text


translator = Translator()
