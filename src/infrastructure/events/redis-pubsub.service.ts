import { Injectable, OnModuleInit } from '@nestjs/common';
import IORedis from 'ioredis';
import { EventPublisher } from '../../application/services/event-emitter.port.js';

@Injectable()
export class RedisPubSubService extends EventPublisher implements OnModuleInit {
  private publisher = new IORedis();
  private subscriber = new IORedis();

  async onModuleInit() {
    console.log('[RedisPubSubService] Initializing...');
    this.subscriber.subscribe('Content:Updated');
    this.subscriber.on('message', (channel, message) => {
      console.log(`Event -> ${channel}: ${message}`);
    });
  }

  async publish(channel: string, payload: any): Promise<void> {
    await this.publisher.publish(channel, JSON.stringify(payload));
  }
}
