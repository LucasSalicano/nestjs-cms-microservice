import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { UpdateContentUseCase } from '../../application/use-cases/contents/update-content.use-case';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ContentEditGateway {
  constructor(private readonly updateContentUseCase: UpdateContentUseCase) {}

  @SubscribeMessage('join')
  handleJoin(
    @MessageBody() data: { contentId: string },
    @ConnectedSocket() socket: Socket,
  ) {
    const contentId = data.contentId;
    socket.join(`content-${contentId}`);
    console.log(`[Socket] ${socket.id} joined content-${contentId}`);
  }

  @SubscribeMessage('edit')
  async handleEdit(
    @MessageBody()
    data: { contentId: string; title?: string; body?: string; userId: string },
    @ConnectedSocket() socket: Socket,
  ) {
    const { contentId, title, body, userId } = data;

    if (!contentId || (!title && !body)) {
      console.warn('[Socket] Invalid edit payload:', data);
      return;
    }

    try {
      await this.updateContentUseCase.execute(
        contentId,
        {
          title: title ?? '',
          body: body ?? '',
        },
        userId,
      );

      socket.to(`content-${contentId}`).emit('update', {
        title,
        body,
      });

      console.log(`[Socket] Content ${contentId} updated via WebSocket.`);
    } catch (error) {
      console.error('[Socket] Failed to update content:', error.message);
      socket.emit('error', { message: 'Failed to update content.' });
    }
  }

  @SubscribeMessage('leave')
  handleLeave(
    @MessageBody() contentId: string,
    @ConnectedSocket() socket: Socket,
  ) {
    socket.leave(`content-${contentId}`);
    console.log(`[Socket] ${socket.id} left content-${contentId}`);
  }
}
