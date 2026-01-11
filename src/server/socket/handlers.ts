import type { Server, Socket } from 'socket.io';

export function setupSocketHandlers(io: Server): void {
  io.on('connection', (socket: Socket) => {
    console.log('Device connected:', socket.id);
    io.emit('device:joined', { id: socket.id });

    socket.on('disconnect', () => {
      console.log('Device disconnected:', socket.id);
      io.emit('device:left', { id: socket.id });
    });
  });
}
