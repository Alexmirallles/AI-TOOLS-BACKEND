from rest_framework import generics
from .models import File
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework import status
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import JsonResponse
from API.serializers import FileUploadSerializer
import openai
import fitz  
from .models import Page

import numpy as np
from django.conf import settings

from dotenv import load_dotenv
import os





from django.http import JsonResponse, FileResponse
from rest_framework.parsers import JSONParser
import openai
import tempfile
import requests



openai.api_key = settings.OPEN_AI_APIKEY





class FileListCreateView(generics.ListCreateAPIView):
    queryset = File.objects.all()
    serializer_class = FileUploadSerializer

class FileDetailView(generics.RetrieveDestroyAPIView):
    queryset = File.objects.all()
    serializer_class = FileUploadSerializer




class FileUploadAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = FileUploadSerializer
    openai = openai.OpenAI(api_key=settings.OPEN_AI_APIKEY)




    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            # Save the file to the database
            file_instance = serializer.save()
            pdf_path = file_instance.name.path

            # Open the PDF file
            doc = fitz.open(pdf_path)

            # Process each page separately
            for page_num in range(doc.page_count):
                page = doc[page_num]
                page_text = page.get_text()

                # Use OpenAI to embed the document page
                document_embedded = self.openai.embeddings.create(
                    model="text-embedding-ada-002",
                    input=[page_text]
                ).data[0].embedding

                # Create and save each page record
                Page.objects.create(
                    uploaded_file=file_instance,
                    page_number=page_num,
                    text=page_text,
                    embedded=document_embedded
                )

            return Response(
                {'message': 'File uploaded and processed successfully'},
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


    
        


class SimilaritySearchAPIView(APIView):
    openai = openai.OpenAI(api_key=settings.OPEN_AI_APIKEY)

    def post(self, request, *args, **kwargs):
        if 'message' in request.data and 'message_history' in request.data:
            message = request.data['message']
            message_history = request.data['message_history']


            

            # Default initialization when message_history is None
            if message_history is None:
                message_history = [{"content": "Avatar Social", "role": "system"}]

            request.data['message_history'] = message_history  # Set the default value in request.data

            if not isinstance(message_history, list):
                print("message_history is not a list")

            # Calculate the embedding for the message
            message_vector = self.openai.embeddings.create(
                input=message,
                model="text-embedding-ada-002"
            ).data[0].embedding

            # Get all files from the database
            all_files = Page.objects.all()

            max_similarity_score = -1  # Initialize with a value lower than any possible score
            most_similar_text = ""

            # Iterate over each file to find the most similar one
            for file_instance in all_files:
                # Assuming 'embedded_blob' is a list saved in the JSONField
                embedded_blob = file_instance.embedded

                # Calculate the similarity score
                document_similarity_score = np.dot(message_vector, embedded_blob)

                # Check if the current file has a higher similarity score
                if document_similarity_score > max_similarity_score:
                    max_similarity_score = document_similarity_score
                    most_similar_text = file_instance.text


            # Change the existing "content" in message_history with most_similar_text for "system" role
            if message_history:
                for msg in message_history:
                    if 'role' in msg and msg['role'] == 'system' and 'content' in msg:
                        msg['content'] = most_similar_text
                        break


                message_history.append({"role": "user", "content": message})

                response = self.openai.chat.completions.create(
                    model="gpt-3.5-turbo",
                    messages=message_history
                )

                chatbot_reply = response.choices[0].message.content

                message_history.append({"role": "assistant", "content": chatbot_reply})


                return Response({
                    'reply': chatbot_reply,
                    'message_history': message_history 
                }, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid request data'}, status=status.HTTP_400_BAD_REQUEST)
    


class DeleteFileView(APIView):
    def delete(self, request, pk):
        try:
            file_instance = File.objects.get(pk=pk)
            file_instance.delete()
            return JsonResponse({'message': 'File deleted successfully.'})
        except File.DoesNotExist:
            return JsonResponse({'error': 'File not found.'}, status=404)
        except Exception as e:
            return JsonResponse({'error': f'An error occurred: {str(e)}'}, status=500)






class GenerateSpeech(APIView):
    parser_classes = [JSONParser]

    def post(self, request, *args, **kwargs):
        try:
            input_text = request.data['input_text']
            client = openai.OpenAI(api_key=settings.OPEN_AI_APIKEY)

            response = client.audio.speech.create(
                model="tts-1",
                voice="alloy",
                input=input_text
            )

            temp_file_path = tempfile.NamedTemporaryFile(delete=False, suffix=".mp3").name
            response.stream_to_file(temp_file_path)

            return FileResponse(open(temp_file_path, 'rb'), as_attachment=True, filename="speech.mp3", content_type='audio/mp3')
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

class AudioToText(APIView):
    parser_classes = [JSONParser]

    def post(self, request, *args, **kwargs):
        if 'url' not in request.data:
            return JsonResponse({'error': 'No audio URL provided'}, status=400)

        audio_url = request.data['url']
        response = requests.get(audio_url)
        if response.status_code != 200:
            return JsonResponse({'error': 'Failed to download audio file'}, status=400)

        with open("output.wav", "wb") as audio_file:
            audio_file.write(response.content)

        client = openai.OpenAI(api_key=settings.OPEN_AI_APIKEY)
        with open("output.wav", "rb") as audio_file:
            transcript = client.audio.transcriptions.create(
                model="whisper-1",
                file=audio_file,
                response_format="text"
            )

        return JsonResponse({'text': transcript})

import json
class ChangeTone(APIView):
    parser_classes = [JSONParser]

    def post(self, request, *args, **kwargs):
        try:
            text_to_modify = request.data['text']
            tone_option = request.data['tone_option']  # Expecting values like 'professional', 'emotional', etc.
            client = openai.OpenAI(api_key=settings.OPEN_AI_APIKEY)

            system_message = f"You are to make this text more {tone_option} and longer."
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": system_message},
                    {"role": "user", "content": text_to_modify},
                ]
            )
            # print(response)
            modified_text=response.choices[0].message.content

            # modified_text = response[1]
            return JsonResponse({'text': modified_text})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)



class TextToImage(APIView):
    def post(self, request, *args, **kwargs):
        try:
            text = request.data['text']
            client = openai.OpenAI(api_key=settings.OPEN_AI_APIKEY)

            # Generate images using DALL-E
            response = client.images.generate(
                model="dall-e-2",
                prompt=text,
                size="1024x1024",  # You can specify the size of the images here
                n=5,  # Number of images to generate
                quality="standard"  # Or set to 'high' for higher quality images
            )

            # Extract the image URLs
            image_urls = [image.url for image in response.data]

            return JsonResponse({'urls': image_urls})

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)