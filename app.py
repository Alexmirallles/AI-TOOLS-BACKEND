import speech_recognition as sr
from flask import Flask, request, jsonify, send_file
from openai import OpenAI
import openai

import requests
import tempfile

# from googletrans import Translator

app = Flask(__name__)
recognizer = sr.Recognizer()

@app.route('/generate-speech', methods=['POST'])
def generate_speech():
    try:
        input_text = request.json['input_text']
        # openai.api_key = request.json['open_ai']

        client= OpenAI(
                api_key=request.json['open_ai'],

        )

        
        response = client.audio.speech.create(
            model="tts-1",
            voice="alloy",
            input=input_text
        )

  

        temp_file_path = tempfile.NamedTemporaryFile(delete=False, suffix=".mp3").name
        response.stream_to_file(temp_file_path)

        return send_file(
            temp_file_path,
            as_attachment=True,
            download_name="speech.mp3",
            mimetype="audio/mp3"
        )
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

# @app.route('/audio-to-text', methods=['POST'])
# def audio_to_text():
#     if 'audio' not in request.files:
#         return jsonify({'error': 'No audio file provided'}), 400

#     audio_file = request.files['audio']
    
#     # Convert to WAV format (assuming the exported format is WAV)
#     # audio = AudioSegment.from_file(audio_file, format="mp3")
#     # wav_path = "path_to_exported_file.wav"
#     # audio.export(wav_path, format="wav")

#     try:
#         with sr.AudioFile(audio_file) as source:
#             audio_data = recognizer.record(source)

#         text = recognizer.recognize_google(audio_data)
#         return jsonify({'text': text})

#     except sr.UnknownValueError:
#         return jsonify({'error': 'Speech Recognition could not understand the audio'}), 400
#     except sr.RequestError as e:
#         return jsonify({'error': f"Could not request results from Google Web Speech API; {e}"}), 500
#     except ValueError as ve:
#         return jsonify({'error': f"Error reading audio file: {ve}"}), 400
#     except Exception as ex:
#         return jsonify({'error': f"Unexpected error: {ex}"}), 500


@app.route('/audio-to-text', methods=['POST'])
def audio_to_text():
    if 'url' not in request.json:
        return jsonify({'error': 'No audio URL provided'}), 400

    audio_url = request.json['url']

    # Download audio file
    response = requests.get(audio_url)
    if response.status_code != 200:
        return jsonify({'error': 'Failed to download audio file'}), 400

    # Save the audio file locally as output.wav
    with open("output.wav", "wb") as audio_file:
        audio_file.write(response.content)

    # Configure OpenAI API
    # openai_api_key = request.json.get('open_ai', 'your_openai_api_key')
    # openai = OpenAIAPI(api_key=openai_api_key)
    client= OpenAI(
                api_key=request.json['open_ai'],

        )

    audio_file = open("output.wav", "rb")


    try:
        # Call OpenAI API for transcription
        transcript=client.audio.transcriptions.create(
            model="whisper-1", 
            file=audio_file,  # Pass raw audio data
            response_format="text"
        )
        # transcript = openai.audio.transcriptions.create(
      
        # )

        text = transcript
        return jsonify({'text': text})

    except Exception as ex:
        return jsonify({'error': f"Unexpected error: {ex}"}), 500

















@app.route('/change-tone', methods=['POST'])
def change_tone():
    # Extract parameters from the request
    openai_api_key = request.json.get('open_ai', 'your_openai_api_key')
    text_to_modify = request.json.get('text', '')
    is_professional = request.json.get('professional', False)
    is_emotional = request.json.get('emotional', False)
    is_longer = request.json.get('longer', False)
    is_shorter = request.json.get('shorter', False)

    # Set the OpenAI API key
    openai.api_key = openai_api_key

    # Validate input parameters
    if sum([is_professional, is_emotional, is_longer, is_shorter]) != 1:
        return jsonify({'error': 'Please choose exactly one tone/length modification option'}), 400

    # Define the system message based on the selected option
    if is_professional:
        system_message = "You are to make this text more professional."
    elif is_emotional:
        system_message = "You are to make this text more emotional."
    elif is_longer:
        system_message = "You are to make this text longer."
    elif is_shorter:
        system_message = "You are to make this text shorter or summarize it."

    # Make the OpenAI API call
    try:
        response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content":text_to_modify},
        ]
        )
        modified_text = response['choices'][0]['message']['content']
        return jsonify({'text': modified_text})
    except Exception as ex:
        return jsonify({'error': f"Unexpected error: {ex}"}), 500


# @app.route('/translate', methods=['POST'])
# def translate():


#     lang = request.json['lang']
#     message=request.json['text']

  


#     try:
#         translator = Translator()
#         text_to_translate = message  # Spanish text
#         translated_text = translator.translate(text_to_translate, dest=lang)  # Translate to French

#         # print(translated_text.text)

#         return jsonify({'text':translated_text.text})

#     except Exception as ex:
#         return jsonify({'error': f"Unexpected error: {ex}"}), 500




@app.route('/text-image', methods=['POST'])
def textImage():
    try:
        text = request.json['text']
        client = OpenAI(api_key=request.json['open_ai'])

        # Generate 5 images
        response = client.images.generate(
            model="dall-e-2",
            prompt=text,
            size="1024x1024",
            quality="standard",
            n=5,
        )

        # Extract image URLs
        image_urls = [image.url for image in response.data]

        return jsonify({'urls': image_urls})

    except Exception as ex:
        return jsonify({'error': f"Unexpected error: {ex}"}), 500



if __name__ == '__main__':
    app.run(debug=True)
