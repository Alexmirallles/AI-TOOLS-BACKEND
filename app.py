import speech_recognition as sr
from flask import Flask, request, jsonify, send_file
from openai import OpenAI
import requests
import tempfile


# import os
# import pydub 

app = Flask(__name__)
recognizer = sr.Recognizer()

@app.route('/generate-speech', methods=['POST'])
def generate_speech():
    try:
        input_text = request.json['input_text']
        client = OpenAI(api_key=request.json['open_ai'])


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



# @app.route('/audio-to-text', methods=['POST'])
# def audio_to_text():
#     if 'url' not in request.json:
#         return jsonify({'error': 'No audio URL provided'}), 400

#     audio_url = request.json['url']

#     # Download audio file
#     # response = requests.get(audio_url)
#     # if response.status_code != 200:
#     #     return jsonify({'error': 'Failed to download audio file'}), 400

#     # # Convert to Pydub AudioSegment
#     # audio = AudioSegment.from_file(io.BytesIO(response.content))

#     # Configure OpenAI API
#     openai_api_key = request.json.get('open_ai', 'your_openai_api_key')
#     openai = OpenAI(api_key=openai_api_key)
#     audio_file = open("/Users/user/Documents/Programming/Freelancing/Versus Socials/69677209.wav", "rb")


#     try:
#         # Call OpenAI API for transcription
#         transcript = openai.audio.transcriptions.create(
#             model="whisper-1", 
#             file=audio_file,  # Pass raw audio data
#             response_format="text"
#         )

#         text = transcript
#         return jsonify({'text': text})

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
    openai_api_key = request.json.get('open_ai', 'your_openai_api_key')
    openai = OpenAI(api_key=openai_api_key)

    audio_file = open("output.wav", "rb")


    try:
        # Call OpenAI API for transcription
        transcript = openai.audio.transcriptions.create(
            model="whisper-1", 
            file=audio_file,  # Pass raw audio data
            response_format="text"
        )

        text = transcript
        return jsonify({'text': text})

    except Exception as ex:
        return jsonify({'error': f"Unexpected error: {ex}"}), 500



if __name__ == '__main__':
    app.run(debug=True)
