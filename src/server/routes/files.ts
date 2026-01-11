import { Router } from 'express';
import multer from 'multer';
import { fileService, type MulterFile } from '../services/fileService.js';
import { io } from '../index.js';

const router = Router();

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB max
});

// GET /api/files - List all files
router.get('/', (_req, res) => {
  const files = fileService.listFiles();
  res.json(files);
});

// GET /api/files/:id - Download a file
router.get('/:id', (req, res) => {
  const result = fileService.getFile(req.params.id);

  if (!result) {
    res.status(404).json({ error: 'File not found' });
    return;
  }

  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader('Content-Disposition', `attachment; filename="${result.metadata.name}"`);
  res.setHeader('Content-Length', result.metadata.size);
  res.sendFile(result.path);
});

// POST /api/files - Upload a file
router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: 'No file provided' });
    return;
  }

  try {
    const metadata = fileService.saveFile(req.file as MulterFile);
    // Broadcast to all connected clients
    io.emit('file:added', { file: metadata });
    res.status(201).json(metadata);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to save file' });
  }
});

// DELETE /api/files/:id - Delete a file
router.delete('/:id', (req, res) => {
  const fileId = req.params.id;
  const deleted = fileService.deleteFile(fileId);

  if (!deleted) {
    res.status(404).json({ error: 'File not found' });
    return;
  }

  // Broadcast to all connected clients
  io.emit('file:removed', { id: fileId });
  res.status(204).send();
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
