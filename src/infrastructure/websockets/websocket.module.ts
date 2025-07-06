import { Module } from '@nestjs/common';
import { ContentEditGateway } from './content-edit.gateway.js';

@Module({
  providers: [ContentEditGateway],
})
export class WebSocketModule {}
