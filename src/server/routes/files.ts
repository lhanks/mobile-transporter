import { Router } from 'express';
import multer from 'multer';
import { fileService, type MulterFile } from '../services/fileService.js';

const router = Router();

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB max
});

// POST /api/files - Upload a file
router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: 'No file provided' });
    return;
  }

  try {
    const metadata = fileService.saveFile(req.file as MulterFile);
    res.status(201).json(metadata);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to save file' });
  }
});

// Multer error handling middleware
router.use((err: Error & { code?: string }, req: Express.Request, res: Express.Response, next: Function) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    (res as any).status(413).json({ error: 'File too large' });
    return;
  }
  next(err);
});

export default router;
