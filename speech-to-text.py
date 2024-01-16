

import requests
import soundfile as sf
from pysndfx import AudioEffectsChain

api_url = 'http://127.0.0.1:5000/audio-to-text'
audio_file_path = '/Users/user/Documents/Programming/Freelancing/Versus Socials/2024-01-13 19.40.42.wav'

# Read the audio file
s, rate = sf.read(audio_file_path)

# Define the effect chain
fx = AudioEffectsChain().speed(0.8)  # Adjust the volume level here (0.5 reduces volume by half)

# Apply the effect to the audio data
s = fx(s, sample_in=rate)

# Save the processed audio to a temporary file
processed_audio_file_path = '/Users/user/Documents/Programming/Freelancing/Versus Socials/processed_audio.wav'
dst = 'test_1.2.wav'
sf.write(dst, s, rate, 'PCM_16')

# Create the files parameter for the API request
with open(processed_audio_file_path, 'rb') as file:
    files = {'audio': (dst, file, 'audio/wav')}

# Make the API request
response = requests.post(api_url, files=files)

if response.status_code == 200:
    result = response.json()
    print(f'Text from audio: {result["text"]}')
else:
    print(f'Error: {response.status_code} - {response.json()}')
