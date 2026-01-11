import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { initUploadsDir } from './services/fileService.js';
import { setupSocketHandlers } from './socket/handlers.js';
import filesRouter from './routes/files.js';

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 3001;

// Initialize Socket.io
export const io = new Server(httpServer, {
  cors: {
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

httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
