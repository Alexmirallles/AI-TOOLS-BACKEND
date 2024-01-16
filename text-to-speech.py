import requests

api_url = 'http://127.0.0.1:5000/text-to-speech'

# Provide the text you want to convert to speech
text_to_convert = """
No quieres hacer un challenge nosotros, motivar y enseñar con nuestros ejemplo, un par de meses de contenido , lanzar algún producto, crear una comunidad para la gente quiera crecer con nosotros. Pensar en una oferta que podemos dar, un webinar, masterclass, unas guías de algo 😁 
Lo podemos hacer rápido creo. Yo tengo seguidores ya. Son hombres. El hecho de que estes tú sube mucho la confianza de ellos. Que si yo estuviera diciendo lo mismo sola 🤣😁
Antes de vender una formación relativa a la inversión, que eso tardará más. Porque el público que tengo, no todos van a querer invertir, hará falta más tiempo para conseguir público nuevo que quiera invertir o que algunos de los que tengo se interesen. Pero los que quieran motivarse y crecer con nosotros, será más fácil. 
Tenemos muchos conocimientos, disciplina, energía, hábitos , tú eres un crack, yo tengo seguidores. 
Inversiones y la educación financiera si, eso también, pero lo veo más lejano. Como lo ves ?  
O tú quieres cosas más grandes directamente?.
"""
response = requests.post(api_url, json={'text': text_to_convert})

if response.status_code == 200:
    # Save the received audio file
    with open('output.mp3', 'wb') as audio_file:
        audio_file.write(response.content)
    print('Audio file saved as output.mp3')
else:
    print(f'Error: {response.status_code} - {response.json()}')
