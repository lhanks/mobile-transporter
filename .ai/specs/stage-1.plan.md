# Plan: Stage 1 - MVP Implementation

> Status: Approved
> Created: 2026-01-11

## Overview

Stage 1 delivers the minimum viable product for Mobile Transporter: a working file sharing system where users can upload files from one device and download them from another device on the same local network, with real-time updates.

## Problem

Users need a quick way to share files between devices on the same network without cloud services, cables, or complex setup. Stage 1 proves the core concept works.

## Goals

- [ ] Project is scaffolded with TypeScript, React, Express, and Socket.io
- [ ] Server can accept file uploads and store them locally
- [ ] Server provides REST API for listing/downloading/deleting files
- [ ] UI allows drag-drop file uploads with progress indicators
- [ ] UI shows file list and allows downloads
- [ ] WebSocket connection provides real-time file list updates
- [ ] Works in any modern web browser (mobile or desktop)

## Architecture

### High-level Component Structure

```
┌─────────────────────────────────────────┐
│         React Frontend (Vite)           │
│  ┌────────────┐      ┌───────────────┐  │
│  │ File List  │◄─────┤ WebSocket     │  │
│  │ Component  │      │ Service       │  │
│  └─────┬──────┘      └───────┬───────┘  │
│        │                     │          │
│  ┌─────▼──────┐              │          │
│  │  Upload    │              │          │
│  │  Component │              │          │
│  └─────┬──────┘              │          │
└────────┼─────────────────────┼──────────┘
         │                     │
         │ HTTP                │ WS
         ▼                     ▼
┌────────────────────────────────────────┐
│         Express Server                 │
│  ┌──────────────┐  ┌─────────────────┐ │
│  │ File Routes  │  │ Socket.io       │ │
│  │ (REST API)   │  │ Event Handlers  │ │
│  └──────┬───────┘  └────────┬────────┘ │
│         │                   │          │
│         ▼                   ▼          │
│  ┌──────────────────────────────────┐  │
│  │    File Service                  │  │
│  │  (Business Logic)                │  │
│  └───────────────┬──────────────────┘  │
└──────────────────┼─────────────────────┘
                   ▼
           ┌──────────────┐
           │  ./uploads/  │
           │  (storage)   │
           └──────────────┘
```

### Key Technology Choices

- **Monorepo**: Single package.json with client/server in same project
- **Vite**: Fast dev server for React, serves from `/` in dev mode
- **Express**: Backend API server on port 3001
- **Socket.io**: WebSocket server integrated with Express
- **Multer**: Multipart form handling for file uploads
- **UUID**: Generate unique file IDs
- **Tailwind CSS**: Utility-first styling

### File Storage Strategy

- Files stored in `./uploads/` directory
- Each file has metadata JSON: `{id, name, size, uploadedAt}`
- Metadata stored in memory (simple Map object)
- File cleanup/expiry deferred to future phase

## Key Decisions

**Decision: Monorepo vs Separate Repos**
- **Choice**: Monorepo (client + server in one project)
- **Rationale**: Simpler development, shared TypeScript types, easier deployment

**Decision: REST + WebSocket vs GraphQL**
- **Choice**: REST for CRUD operations, WebSocket for real-time updates
- **Rationale**: Simpler implementation, widely understood, perfect for this use case

**Decision: In-memory metadata vs Database**
- **Choice**: In-memory Map for file metadata
- **Rationale**: MVP doesn't need persistence, simplifies architecture, fast lookups

**Decision: Multi-file upload approach**
- **Choice**: Browser native File API + FormData, process files sequentially on server
- **Rationale**: Works across all browsers, progress tracking per file, no chunking needed for MVP

**Decision: No authentication for v1**
- **Choice**: Trust-based, local network only
- **Rationale**: Reduces complexity, acceptable risk for local network use

## Implementation Stories

### Story 1: Project Scaffolding
Create base project structure with TypeScript, Vite, React, Express, and Tailwind CSS configured.

**What to build:**
- Initialize npm project
- Install dependencies (React, Express, Socket.io, TypeScript, Vite, Tailwind)
- Configure TypeScript for client and server
- Configure Vite for React + Tailwind
- Create folder structure: `src/{client,server,shared}/`
- Add basic dev scripts to package.json

**Success criteria:**
- `npm run dev` starts both Vite dev server and Express server
- TypeScript compiles without errors
- React app shows "Hello World" at `http://localhost:5173`
- Express responds to `GET /api/status` at `http://localhost:3001`

---

### Story 2: File Storage Service
Implement server-side file storage with basic CRUD operations.

**What to build:**
- Create `uploads/` directory on server startup
- File metadata interface: `{id, name, size, uploadedAt}`
- In-memory Map to store metadata
- FileService class with methods:
  - `saveFile(file, metadata)` - saves to disk, stores metadata
  - `listFiles()` - returns array of all file metadata
  - `getFile(id)` - returns file path + metadata
  - `deleteFile(id)` - removes file + metadata

**Success criteria:**
- Files saved to `./uploads/{uuid}-{originalName}`
- Metadata tracked in memory
- Can list/get/delete files programmatically

---

### Story 3: File Upload REST API
Expose HTTP endpoint for file uploads using Multer.

**What to build:**
- Install and configure Multer middleware
- `POST /api/files` endpoint with multipart form handling
- Request validation (check file exists)
- Response returns file metadata JSON
- Error handling for disk full, file too large

**Success criteria:**
- Can upload file via curl/Postman
- Returns 201 with file metadata
- File appears in `./uploads/`
- Returns 400 for invalid requests

---

### Story 4: File List/Download REST API
Expose endpoints for listing and downloading files.

**What to build:**
- `GET /api/files` - returns JSON array of file metadata
- `GET /api/files/:id` - serves file with proper Content-Type and Content-Disposition
- `DELETE /api/files/:id` - removes file and returns 204

**Success criteria:**
- List endpoint returns all uploaded files
- Download endpoint streams file to browser
- Delete endpoint removes file from disk and memory
- Proper HTTP status codes (200, 404, 500)

---

### Story 5: WebSocket Connection Setup
Establish Socket.io connection between client and server.

**What to build:**
- Configure Socket.io on Express server
- Create socket event handlers file
- React hook: `useSocket()` that connects to server
- Emit `device:joined` on connection
- Emit `device:left` on disconnect
- Basic connection status logging

**Success criteria:**
- WebSocket connects when React app loads
- Server logs device connections/disconnections
- React hook returns socket instance
- Reconnects automatically on connection loss

---

### Story 6: Real-time File Updates (WebSocket)
Broadcast file changes to all connected clients.

**What to build:**
- Server emits `file:added` event after successful upload
- Server emits `file:removed` event after successful delete
- React hook: `useFileSync()` that listens to socket events
- Updates local file list state on receiving events

**Success criteria:**
- Upload on device A instantly shows on device B
- Delete on device A instantly removes from device B
- No polling needed
- Events include full file metadata

---

### Story 7: File List UI Component
Build React component to display available files.

**What to build:**
- `FileList` component with table/card layout
- Displays: filename, size (formatted), upload date
- "Download" button per file
- "Delete" button per file
- Empty state when no files
- Loading state during initial fetch
- Styled with Tailwind CSS

**Success criteria:**
- Shows all uploaded files
- Human-readable file sizes (KB, MB, GB)
- Relative timestamps ("2 minutes ago")
- Responsive layout (works on mobile)

---

### Story 8: File Upload UI Component
Build drag-and-drop file upload interface.

**What to build:**
- `FileUpload` component with drag-drop zone
- Fallback to file input click
- Multi-file selection support
- Upload progress bar per file
- Upload queue (sequential uploads)
- Success/error notifications
- Styled with Tailwind CSS

**Success criteria:**
- Drag files onto zone highlights it
- Multiple files can be selected at once
- Shows progress for each file (0-100%)
- Uploads happen one at a time
- Shows success message after upload
- Shows error message on failure

---

### Story 9: Main App Layout
Compose FileUpload and FileList into main app UI.

**What to build:**
- `App.tsx` layout with header, upload section, file list section
- App header with title and connection status indicator
- Footer with device count
- Integrate `useSocket()` and `useFileSync()` hooks
- Error boundary for unhandled errors

**Success criteria:**
- Clean, intuitive single-page layout
- Upload zone at top, file list below
- Connection status shows green dot when connected
- Shows "X devices connected" in footer
- Graceful error handling

---

### Story 10: Production Build & Deployment
Configure production build and deployment process.

**What to build:**
- Production build script that bundles both client and server
- Express serves Vite build output in production
- Environment variable handling (PORT, NODE_ENV)
- README with setup/run instructions
- `.gitignore` for `uploads/`, `node_modules/`, build artifacts

**Success criteria:**
- `npm run build` creates production bundle
- `npm start` runs production server
- Production server serves React app and API from same port
- README includes clear setup instructions
- Works when cloned to fresh machine

## Open Questions (Resolved)

- [x] Should we limit file sizes in MVP? **Yes, 100MB max**
- [x] Should uploads/ be git-ignored and created on startup? **Yes**
- [x] Do we want toast notifications or inline messages for upload feedback? **Inline messages for MVP (simpler)**
- [x] Should we add basic file type icons or just show extensions? **Show extensions only for MVP**
- [x] Should delete require confirmation modal or be instant? **Instant delete for MVP (simpler)**

## Non-Goals for Stage 1

These are explicitly **out of scope** for MVP:

- Device naming or identification
- QR code pairing
- File preview (images, PDFs)
- Batch download (zip files)
- Transfer history/logging
- Auto-expiry of old files
- Encryption
- Authentication/authorization
- Cloud relay for remote access
- Native mobile apps
- Desktop Electron app
- File chunking for large uploads

## Risks

| Risk | Mitigation |
|------|-----------|
| Large file uploads crash browser | Document 100MB limit, defer chunking to later |
| Concurrent uploads to same filename | UUID prefix prevents collision |
| Memory leak in file metadata Map | Monitor in production, add cleanup in next phase |
| WebSocket disconnects frequently | Socket.io handles reconnection automatically |
| Mobile browser drag-drop doesn't work | File input fallback always works |

## Next Phase Preview (Stage 2)

After Stage 1 is complete and tested:

- Device discovery and identification
- QR code connection links
- File preview for common types
- Batch operations
- Auto-expiry and cleanup
- Transfer progress improvements
