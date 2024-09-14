import axios from 'axios';

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post('/api/files', formData);
  return response.data;
};

export const downloadFile = async (blobId: string) => {
  const response = await axios.get(`/api/files?blobId=${blobId}`, {
    responseType: 'blob'
  });
  return response.data;
};

export const listFiles = async () => {
  const response = await axios.get('/api/files');
  return response.data;
};
export const publishWebsite = async (siteName: string, files: File[]) => {
    const formData = new FormData();
    formData.append('siteName', siteName);
    files.forEach((file) => {
      formData.append('files', file, file.name);
    });
  
    const response = await axios.post('/api/publish', formData);
    return response.data;
  };
  
  export const publishSite = async (siteName: string, files: File[]) => {
    const formData = new FormData();
    formData.append('siteName', siteName);
    files.forEach((file) => {
      formData.append('files', file);
    });
    const response = await axios.post('/api/site/publish', formData);
    return response.data;
  };

export const updateSite = async (siteObjectId: string, files: File[]) => {
  const formData = new FormData();
  formData.append('siteObjectId', siteObjectId);
  files.forEach((file) => {
    formData.append('files', file, file.name);
  });

  const response = await axios.post('/api/site/update', formData);
  return response.data;
};