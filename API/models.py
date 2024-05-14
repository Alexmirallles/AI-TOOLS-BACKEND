from django.db import models

class File(models.Model):
    name = models.FileField(upload_to='uploads/')  # Path to the PDF file

class Page(models.Model):
    uploaded_file = models.ForeignKey(File, related_name='pages', on_delete=models.CASCADE)
    page_number = models.IntegerField()
    text = models.TextField()
    embedded = models.JSONField(null=True,blank=True)  # Store embedding as a binary blob
