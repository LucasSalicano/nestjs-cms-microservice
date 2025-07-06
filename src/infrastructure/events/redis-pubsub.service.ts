import { Injectable, OnModuleInit } from '@nestjs/common';
import IORedis from 'ioredis';
import { EventPublisher } from '../../application/services/event-emitter.port.js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisPubSubService extends EventPublisher implements OnModuleInit {
  private publisher: IORedis;
  private subscriber: IORedis;

  constructor(private readonly configService: ConfigService) {
    super();

    const redisOptions = {
      host: configService.get<string>('REDIS_HOST') || 'localhost',
      port: Number(configService.get<string>('REDIS_PORT')) || 6379,
      password: configService.get<string>('REDIS_PASSWORD') || undefined,
    };

    this.publisher = new IORedis(redisOptions);
    this.subscriber = new IORedis(redisOptions);
  }

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
