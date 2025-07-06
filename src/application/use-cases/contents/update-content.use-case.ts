import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from '../../../domain/entities/content.entity';
import { ContentVersion } from '../../../domain/entities/content-versions.entity';
import { EventPublisher } from '../../services/event-emitter.port';
import { ContentUpdatedEvent } from '../../../domain/events/content-updated.event';

@Injectable()
export class UpdateContentUseCase {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepo: Repository<Content>,
    @InjectRepository(ContentVersion)
    private readonly versionRepo: Repository<ContentVersion>,
    private readonly eventPublisher: EventPublisher,
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

    await this.eventPublisher.publish(
      'Content:Updated',
      new ContentUpdatedEvent(content.id),
    );

    return updated;
  }
}
