import speech_recognition as sr
from flask import Flask, request, jsonify, send_file
from openai import OpenAI
import tempfile
import os

app = Flask(__name__)
client = OpenAI(api_key="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")
recognizer = sr.Recognizer()

@app.route('/generate-speech', methods=['POST'])
def generate_speech():
    try:
        input_text = request.json['input_text']

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
    

@app.route('/audio-to-text', methods=['POST'])
def audio_to_text():
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file provided'}), 400

    audio_file = request.files['audio']

    try:
        with sr.AudioFile(audio_file) as source:
            audio_data = recognizer.record(source)

        text = recognizer.recognize_google(audio_data)
        return jsonify({'text': text})

    except sr.UnknownValueError:
        return jsonify({'error': 'Speech Recognition could not understand the audio'}), 400
    except sr.RequestError as e:
        return jsonify({'error': f"Could not request results from Google Web Speech API; {e}"}), 500


if __name__ == '__main__':
    app.run(debug=True)
