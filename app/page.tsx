'use client';
import { useState } from 'react';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';


export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUploadSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>DShare - Decentralized File Sharing and Walrus Sites</h1>
      <FileUpload onUploadSuccess={handleUploadSuccess} />
      <FileList refreshTrigger={refreshTrigger} />
     
    </main>
  );
}