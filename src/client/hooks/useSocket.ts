import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.PROD
  ? window.location.origin
  : 'http://localhost:3001';

export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [deviceCount, setDeviceCount] = useState(0);

  useEffect(() => {
    const s = io(SOCKET_URL);

    s.on('connect', () => {
      setConnected(true);
    });

    s.on('disconnect', () => {
      setConnected(false);
    });

    s.on('device:joined', () => {
      setDeviceCount((c) => c + 1);
    });

    s.on('device:left', () => {
      setDeviceCount((c) => Math.max(0, c - 1));
    });

    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  return { socket, connected, deviceCount };
}
