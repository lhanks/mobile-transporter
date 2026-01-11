# Mobile Transporter

A cross-device file sharing application with real-time synchronization. Share files between devices on the same network through a simple web interface.

## Features

- Drag-and-drop file upload
- Real-time file synchronization across connected devices
- Download and delete files from any connected device
- Connection status and device count display
- Responsive mobile-friendly UI

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Vite
- **Backend**: Express, Socket.io
- **File Handling**: Multer (100MB max file size)

## Development

### Prerequisites

- Node.js 18+
- npm

### Install Dependencies

```bash
npm install
```

### Run in Development Mode

Start both the server and client with hot-reload:

```bash
npm run dev
```

- Client: http://localhost:5173
- Server: http://localhost:3001

### Run Server Only

```bash
npm run server
```

### Run Client Only

```bash
npm run client
```

## Production

### Build

```bash
npm run build
```

This compiles TypeScript server to `dist/` and builds the React client to `dist/client/`.

### Run Production Server

```bash
npm start
```

The server will serve the built client files and handle API requests on http://localhost:3001.

### Environment Variables

- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Set to `production` for production mode

## Project Structure

```
src/
  client/           # React frontend
    components/     # UI components
    hooks/          # Custom React hooks
    utils/          # Utility functions
  server/           # Express backend
    routes/         # API routes
    services/       # Business logic
    socket/         # WebSocket handlers
    types/          # TypeScript types
uploads/            # Uploaded files storage
```

## API Endpoints

- `GET /api/status` - Health check
- `GET /api/files` - List all files
- `GET /api/files/:id` - Download a file
- `POST /api/files` - Upload a file
- `DELETE /api/files/:id` - Delete a file

## WebSocket Events

- `connection:count` - Device count update
- `file:added` - New file uploaded
- `file:removed` - File deleted

## Deployment

### CI/CD Pipeline

The project uses GitHub Actions for continuous integration:

- **On Pull Request**: Runs type checking and build verification
- **On Push to main/master**: Deploys to Vercel production

### Vercel Setup

1. Create a new project on [Vercel](https://vercel.com)
2. Connect your GitHub repository
3. Add the following secrets to your GitHub repository:
   - `VERCEL_TOKEN` - Your Vercel API token
   - `VERCEL_ORG_ID` - Your Vercel organization ID
   - `VERCEL_PROJECT_ID` - Your Vercel project ID

To get these values:
```bash
npm i -g vercel
vercel login
vercel link  # This creates .vercel/project.json with org and project IDs
```

### Architecture Note

This app uses WebSockets for real-time updates. Vercel deploys the static frontend only. For full functionality, deploy the backend to a service that supports WebSockets (Railway, Render, Fly.io).

## License

MIT
