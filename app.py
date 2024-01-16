from flask import Flask, request, jsonify, send_file
import speech_recognition as sr
from gtts import gTTS
import os

app = Flask(__name__)
recognizer = sr.Recognizer()

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

@app.route('/text-to-speech', methods=['POST'])
def text_to_speech():
    if 'text' not in request.json:
        return jsonify({'error': 'No text provided'}), 400

    text = request.json['text']
    tts = gTTS(text)
    tts.save('output.mp3')

    return send_file('output.mp3', as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
