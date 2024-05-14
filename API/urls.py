from django.urls import path
from .views import FileListCreateView, FileDetailView,FileUploadAPIView,SimilaritySearchAPIView,DeleteFileView,GenerateSpeech, AudioToText, TextToImage,ChangeTone

urlpatterns = [
    path('files/', FileListCreateView.as_view(), name='file-list-create'),
    path('files/<int:pk>/', FileDetailView.as_view(), name='file-detail'),
    path('upload/', FileUploadAPIView.as_view(), name='upload_file'),
    path('message/',SimilaritySearchAPIView.as_view(),name="Search"),
    path('delete/<int:pk>',DeleteFileView.as_view(),name="delete"),

    path('generate-speech/', GenerateSpeech.as_view(), name='generate-speech'),
    path('audio-to-text/', AudioToText.as_view(), name='audio-to-text'),
    path('text-to-image/', TextToImage.as_view(), name='text-to-image'),
    path('change-tone/',ChangeTone.as_view(),name="change-tone"),

]


