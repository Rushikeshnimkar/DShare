'use client';
import React, { useState } from 'react';
import { uploadFile } from '../services/api';

const FileUpload: React.FC<{ onUploadSuccess: () => void }> = ({ onUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      try {
        setUploading(true);
        await uploadFile(file);
        alert('File uploaded successfully');
        setFile(null);
        onUploadSuccess();
      } catch (error) {
        console.error('Upload failed:', error);
        alert('Upload failed');
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} disabled={uploading} />
      <button onClick={handleUpload} disabled={!file || uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
};

export default FileUpload;