'use client';
import React, { useState, useEffect } from 'react';
import { downloadFile, listFiles } from '../services/api';

interface FileInfo {
  blobId: string;
  fileName: string;
}

const FileList: React.FC<{ refreshTrigger: number }> = ({ refreshTrigger }) => {
  const [files, setFiles] = useState<FileInfo[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const fileList = await listFiles();
        setFiles(fileList);
      } catch (error) {
        console.error('Failed to fetch files:', error);
      }
    };

    fetchFiles();
  }, [refreshTrigger]);

  const handleDownload = async (blobId: string, fileName: string) => {
    try {
      const blob = await downloadFile(blobId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed');
    }
  };

  return (
    <div>
      <h2>Your Files</h2>
      {files.length === 0 ? (
        <p>No files uploaded yet.</p>
      ) : (
        <ul>
          {files.map((file) => (
            <li key={file.blobId}>
              {file.fileName}
              <button onClick={() => handleDownload(file.blobId, file.fileName)}>
                Download
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileList;