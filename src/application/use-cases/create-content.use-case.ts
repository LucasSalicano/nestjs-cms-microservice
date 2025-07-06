import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from '../../domain/entities/content.entity.js';
import { Repository } from 'typeorm';

// import { ContentQueueService } from '../../infrastructure/queues/services/content-queue.service.js';

@Injectable()
export class CreateContentUseCase {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepo: Repository<Content>,
    // private readonly queue: ContentQueueService,
  ) {}

  async execute(
    data: { title: string; body: string },
    userId: string,
  ): Promise<Content> {
    const content = this.contentRepo.create({ ...data, createdBy: userId });
    return await this.contentRepo.save(content);
  }
}
