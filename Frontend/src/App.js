import './App.css';
import FileUpload from './Components/FileUpload';
import FileList from './Components/FileList';
import { useState } from 'react';
function App() {
  const [fileListKey, setFileListKey] = useState(0);

  const updateFileList = () => {
    // Increment the key to force re-rendering of the FileList component
    setFileListKey((prevKey) => prevKey + 1);
  };



  return (
    <div className="flex flex-col items-center justify-center  py-6 gap-4">
      <FileList key={fileListKey} />
      <div>
      <FileUpload onFileUpload={updateFileList} />
      </div>
    </div>
  );
}

export default App;
