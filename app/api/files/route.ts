import { NextRequest, NextResponse } from 'next/server';
import { storeFile, retrieveFile, listFiles } from '../../lib/walrusService';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  try {
    const buffer = await file.arrayBuffer();
    const blobId = await storeFile(Buffer.from(buffer), file.name);
    return NextResponse.json({ blobId });
  } catch (error) {
    console.error('File upload failed:', error);
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const blobId = searchParams.get('blobId');

  if (blobId) {
    try {
      const { fileBuffer, fileName } = await retrieveFile(blobId);
      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Type': 'application/octet-stream',
          'Content-Disposition': `attachment; filename="${fileName}"`
        }
      });
    } catch (error) {
      console.error('File download failed:', error);
      return NextResponse.json({ error: 'File download failed' }, { status: 500 });
    }
  } else {
    try {
      const files = await listFiles();
      return NextResponse.json(files);
    } catch (error) {
      console.error('Failed to get file list:', error);
      return NextResponse.json({ error: 'Failed to get file list' }, { status: 500 });
    }
  }
}