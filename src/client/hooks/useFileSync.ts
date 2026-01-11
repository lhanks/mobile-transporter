import { useEffect, useState, useCallback } from 'react';
import { useSocket } from './useSocket';
import type { FileMetadata } from '../../shared/types';

const API_URL = import.meta.env.PROD ? '' : 'http://localhost:3001';

export function useFileSync() {
  const { socket } = useSocket();
  const [files, setFiles] = useState<FileMetadata[]>([]);
  const [loading, setLoading] = useState(true);

  // Initial fetch
  useEffect(() => {
    fetch(`${API_URL}/api/files`)
      .then((res) => res.json())
      .then((data) => {
        setFiles(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch files:', error);
        setLoading(false);
      });
  }, []);

  // Real-time updates
  useEffect(() => {
    if (!socket) return;

    socket.on('file:added', ({ file }: { file: FileMetadata }) => {
      setFiles((prev) => [...prev, file]);
    });

    socket.on('file:removed', ({ id }: { id: string }) => {
      setFiles((prev) => prev.filter((f) => f.id !== id));
    });

    return () => {
      socket.off('file:added');
      socket.off('file:removed');
    };
  }, [socket]);

  // Delete file action
  const deleteFile = useCallback(async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/api/files/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        throw new Error('Failed to delete file');
      }
      // File will be removed from state via WebSocket event
    } catch (error) {
      console.error('Delete error:', error);
      throw error;
    }
  }, []);

  return { files, loading, deleteFile };
}
