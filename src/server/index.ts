import express from 'express';
import { initUploadsDir } from './services/fileService.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize uploads directory
initUploadsDir();

app.use(express.json());

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
