import type { FileMetadata } from '../../shared/types';

const API_URL = import.meta.env.PROD ? '' : 'http://localhost:3001';

export interface UploadProgress {
  loaded: number;
  total: number;
  percent: number;
}

export async function uploadFile(
  file: File,
  onProgress?: (progress: UploadProgress) => void
): Promise<FileMetadata> {
  const formData = new FormData();
  formData.append('file', file);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress({
          loaded: e.loaded,
          total: e.total,
          percent: (e.loaded / e.total) * 100,
        });
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status === 201) {
        resolve(JSON.parse(xhr.responseText));
      } else if (xhr.status === 413) {
        reject(new Error('File too large (max 100MB)'));
      } else {
        reject(new Error('Upload failed'));
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Network error'));
    });

    xhr.open('POST', `${API_URL}/api/files`);
    xhr.send(formData);
  });
}
