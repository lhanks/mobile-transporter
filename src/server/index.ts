import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import { initUploadsDir } from './services/fileService.js';
import { setupSocketHandlers } from './socket/handlers.js';
import filesRouter from './routes/files.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === 'production';

// Initialize Socket.io
export const io = new Server(httpServer, {
  cors: isProduction
    ? undefined
    : {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
      },
});

// Setup socket handlers
setupSocketHandlers(io);

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

// Production: serve static files
if (isProduction) {
  const clientPath = path.join(__dirname, '../client');
  app.use(express.static(clientPath));

  // SPA fallback - serve index.html for non-API routes
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(clientPath, 'index.html'));
    }
  });
}

httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  if (isProduction) {
    console.log('Running in production mode');
  }
});
