import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentVersion } from '../../../domain/entities/content-versions.entity';
import { Content } from '../../../domain/entities/content.entity';

@Injectable()
export class DeleteContentUseCase {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepo: Repository<Content>,
    @InjectRepository(ContentVersion)
    private readonly versionRepo: Repository<ContentVersion>,
  ) {}

  async execute(id: string): Promise<{ success: boolean }> {
    const content = await this.contentRepo.findOneBy({ id });

    if (!content) {
      throw new NotFoundException('Content not found');
    }

    await this.contentRepo.remove(content);

    return { success: true };
  }
}
