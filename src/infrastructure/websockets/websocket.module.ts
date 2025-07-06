import { Module } from '@nestjs/common';
import { ContentEditGateway } from './content-edit.gateway.js';
import { ContentModule } from '../http/content/content.module';

@Module({
  imports: [ContentModule],
  providers: [ContentEditGateway],
})
export class WebSocketModule {}
