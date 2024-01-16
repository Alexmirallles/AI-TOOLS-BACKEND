from pathlib import Path
from openai import OpenAI
client = OpenAI(api_key="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")

speech_file_path = Path(__file__).parent / "speech.mp3"
response = client.audio.speech.create(
  model="tts-1",
  voice="alloy",
  input="""
No quieres hacer un challenge nosotros, motivar y enseñar con nuestros ejemplo, un par de meses de contenido , lanzar algún producto, crear una comunidad para la gente quiera crecer con nosotros. Pensar en una oferta que podemos dar, un webinar, masterclass, unas guías de algo 😁 
Lo podemos hacer rápido creo. Yo tengo seguidores ya. Son hombres. El hecho de que estes tú sube mucho la confianza de ellos. Que si yo estuviera diciendo lo mismo sola 🤣😁
Antes de vender una formación relativa a la inversión, que eso tardará más. Porque el público que tengo, no todos van a querer invertir, hará falta más tiempo para conseguir público nuevo que quiera invertir o que algunos de los que tengo se interesen. Pero los que quieran motivarse y crecer con nosotros, será más fácil. 
Tenemos muchos conocimientos, disciplina, energía, hábitos , tú eres un crack, yo tengo seguidores. 
Inversiones y la educación financiera si, eso también, pero lo veo más lejano. Como lo ves ?  
O tú quieres cosas más grandes directamente?.

"""

)

response.stream_to_file(speech_file_path)






# from openai import OpenAI
# client = OpenAI(api_key="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")

# audio_file= open("/Users/user/Documents/Programming/Freelancing/Versus Socials/2024-01-13 19.40.42.wav", "rb")
# transcript = client.audio.transcriptions.create(
#   model="whisper-1", 
#   file=audio_file
# )

# print(transcript)