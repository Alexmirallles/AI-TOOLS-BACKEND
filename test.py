from googletrans import Translator

translator = Translator()
text_to_translate = "Bienvenido a nuestro tutorial!"  # Spanish text
translated_text = translator.translate(text_to_translate, dest='en')  # Translate to French

print(translated_text.text)