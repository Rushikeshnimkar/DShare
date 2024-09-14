import axios from 'axios';


const PUBLISHER = 'https://publisher-devnet.walrus.space';
const AGGREGATOR = 'https://aggregator-devnet.walrus.space';

interface StoredFile {
  blobId: string;
  fileName: string;
}

const storedFiles: StoredFile[] = [];

export const storeFile = async (fileBuffer: Buffer, fileName: string): Promise<string> => {
  try {
    const response = await axios.put(`${PUBLISHER}/v1/store`, fileBuffer, {
      headers: { 'Content-Type': 'application/octet-stream' }
    });
    const blobId = response.data.newlyCreated.blobObject.blobId;
    storedFiles.push({ blobId, fileName });
    return blobId;
  } catch (error) {
    console.error('Error storing file:', error);
    throw new Error('Failed to store file');
  }
};

export const retrieveFile = async (blobId: string): Promise<{ fileBuffer: Buffer; fileName: string }> => {
  try {
    const response = await axios.get(`${AGGREGATOR}/v1/${blobId}`, {
      responseType: 'arraybuffer'
    });
    const fileInfo = storedFiles.find(file => file.blobId === blobId);
    if (!fileInfo) {
      throw new Error('File metadata not found');
    }
    return { fileBuffer: Buffer.from(response.data), fileName: fileInfo.fileName };
  } catch (error) {
    console.error('Error retrieving file:', error);
    throw new Error('Failed to retrieve file');
  }
};

export const listFiles = async (): Promise<StoredFile[]> => {
  return storedFiles;
};
