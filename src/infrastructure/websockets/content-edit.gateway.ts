import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ContentEditGateway {
  @SubscribeMessage('join')
  handleJoin(
    @MessageBody() contentId: string,
    @ConnectedSocket() socket: Socket,
  ) {
    socket.join(`content-${contentId}`);
    console.log(`${socket.id} joined content-${contentId}`);
  }

  @SubscribeMessage('edit')
  handleEdit(
    @MessageBody() data: { contentId: string; delta: any },
    @ConnectedSocket() socket: Socket,
  ) {
    socket.to(`content-${data.contentId}`).emit('update', data.delta);
  }
}
