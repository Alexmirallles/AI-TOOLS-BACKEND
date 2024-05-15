import React, { useRef, useState } from "react";
import './Css/FileUpload.css'
import axios from "axios";
import { message } from "antd";
import {
  XMarkIcon, CheckIcon, FolderIcon,DocumentIcon
} from '@heroicons/react/20/solid'

const FileUpload = ({onFileUpload}) => {
  const inputRef = useRef();

  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("select");

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.size <= 1024 * 1024) {
        setSelectedFile(file);
      } else {
        message.error({ content: "File must be less than 1MB", duration: 4 });
      }
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  const clearFileInput = () => {
    inputRef.current.value = "";
    setSelectedFile(null);
    setProgress(0);
    setUploadStatus("select");
  };

  const handleUpload = async () => {
    if (uploadStatus === "done") {
      clearFileInput();
      return;
    }
  
    setUploadStatus("uploading");
  
    try {
      const formData = new FormData();
      formData.append("name", selectedFile);
  
      // Send the file to the Django API for text extraction
      const response = await axios.post(
        "https://aiapis.onrender.com/api/upload/",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        }
      );
  
      // Handle the response from the Django API
      console.log(response.data); // This might be the extracted text or some other data
      message.success({ content: "File Uploaded Successfully", duration: 4 });
      // await axios.get("http://127.0.0.1:8000/api/train/");

  
      setUploadStatus("done");
      onFileUpload();
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("select");
    }
  };
  
  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {!selectedFile && (
        <button className="file-btn" onClick={onChooseFile}>
          
          <DocumentIcon width={25} className='text-indigo' />
          
          Drag & Drop Pdf File Here
          <button className="px-6 py-2 border border-gray-300 rounded">Upload PDF file</button>
        </button>
      )}

      {selectedFile && (
        <>
          <div className="file-card">
            <FolderIcon width={25} style={{ color: '#7460ff' }} />

            <div className="file-info">
              <div style={{ flex: 1 }}>
                <h6>{selectedFile?.name}</h6>

                <div className="progress-bg">
                  <div className="progress" style={{ width: `${progress}%` }} />
                </div>
              </div>

              {uploadStatus === "select" ? (
                <button onClick={clearFileInput}>
                  <XMarkIcon width={25} className='text-indigo' />
                </button>
              ) : (
                <div className="check-circle">
                  {uploadStatus === "uploading" ? (
                    `${progress}%`
                  ) : uploadStatus === "done" ? (
                    <CheckIcon width={25} className='text-indigo' />
                  ) : null}
                </div>
              )}
            </div>
          </div>
          <button className="upload-btn" onClick={handleUpload}>
            {uploadStatus === "select" || uploadStatus === 'uploading' ? "Upload" : "Done"}
          </button>
        </>
      )}
    </div>
  );
};

export default FileUpload;
