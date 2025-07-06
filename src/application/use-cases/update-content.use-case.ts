import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from '../../domain/entities/content.entity';
import { Repository } from 'typeorm';
import { ContentVersion } from '../../domain/entities/content-versions.entity';

@Injectable()
export class UpdateContentUseCase {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepo: Repository<Content>,
    @InjectRepository(ContentVersion)
    private readonly versionRepo: Repository<ContentVersion>,
    // private readonly queue: ContentQueueService,
  ) {}

  async execute(
    id: string,
    dto: { title: string; body: string },
  ): Promise<Content> {
    const content = await this.contentRepo.findOneByOrFail({ id });

    await this.versionRepo.save({
      contentId: content.id,
      version: content.version,
      title: content.title,
      body: content.body,
      createdBy: 'system',
    });

    content.title = dto.title;
    content.body = dto.body;
    content.version += 1;

    const updated = await this.contentRepo.save(content);

    // await this.queue.publishContentUpdated(content.id);

    return updated;
  }
}
