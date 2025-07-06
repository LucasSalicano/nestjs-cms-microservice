import { Inject, Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import IORedis from 'ioredis';

@Injectable()
export class ContentQueueService {
  private queue: Queue;

  constructor(@Inject('REDIS') private readonly redis: IORedis) {
    this.queue = new Queue('content-events', { connection: this.redis });
  }

  async publishContentUpdated(contentId: string) {
    await this.queue.add('ContentUpdated', { contentId });
  }
}
