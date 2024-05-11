import React, { useState } from "react";

interface IFileUploaderProps {
  onFileSelect: (file: File) => void;
}

function FileUploader({ onFileSelect }: IFileUploaderProps) {
  // Function to handle file selection
  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div style={{width: 200}}>
      <div>File Upload</div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
}

export default FileUploader;
