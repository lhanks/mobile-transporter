import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import type { FileMetadata } from '../../shared/types.js';

const UPLOADS_DIR = path.join(process.cwd(), 'uploads');

// In-memory storage for file metadata
const fileStore = new Map<string, FileMetadata>();

// Ensure uploads directory exists
export function initUploadsDir(): void {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    console.log('Created uploads directory:', UPLOADS_DIR);
  }
}

export interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
}

export class FileService {
  /**
   * Save a file and store its metadata
   */
  saveFile(file: MulterFile): FileMetadata {
    const id = uuidv4();
    const storedFilename = `${id}-${file.originalname}`;
    const destPath = path.join(UPLOADS_DIR, storedFilename);

    // Move file from temp location to uploads dir
    fs.renameSync(file.path, destPath);

    const metadata: FileMetadata = {
      id,
      name: file.originalname,
      size: file.size,
      uploadedAt: new Date(),
    };

    fileStore.set(id, metadata);
    return metadata;
  }

  /**
   * List all stored files
   */
  listFiles(): FileMetadata[] {
    return Array.from(fileStore.values());
  }

  /**
   * Get a file by ID
   */
  getFile(id: string): { path: string; metadata: FileMetadata } | null {
    const metadata = fileStore.get(id);
    if (!metadata) {
      return null;
    }

    const filePath = path.join(UPLOADS_DIR, `${id}-${metadata.name}`);
    if (!fs.existsSync(filePath)) {
      // File was deleted from disk but metadata exists - clean up
      fileStore.delete(id);
      return null;
    }

    return { path: filePath, metadata };
  }

  /**
   * Delete a file by ID
   */
  deleteFile(id: string): boolean {
    const metadata = fileStore.get(id);
    if (!metadata) {
      return false;
    }

    const filePath = path.join(UPLOADS_DIR, `${id}-${metadata.name}`);

    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      fileStore.delete(id);
      return true;
    } catch {
      return false;
    }
  }
}

// Export singleton instance
export const fileService = new FileService();
