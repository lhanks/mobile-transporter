/**
 * Shared types for Mobile Transporter
 */

export interface FileMetadata {
  id: string;
  name: string;
  size: number;
  uploadedAt: Date;
}

export interface StatusResponse {
  status: 'ok' | 'error';
  timestamp: string;
}
