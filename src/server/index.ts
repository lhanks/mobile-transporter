import express from 'express';
import { initUploadsDir } from './services/fileService.js';
import filesRouter from './routes/files.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize uploads directory
initUploadsDir();

app.use(express.json());

// Routes
app.use('/api/files', filesRouter);

// Health check endpoint
app.get('/api/status', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
