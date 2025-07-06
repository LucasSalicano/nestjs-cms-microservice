import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentVersion } from '../../../domain/entities/content-versions.entity';
import { Content } from '../../../domain/entities/content.entity';

@Injectable()
export class GetByIdContentUseCase {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepo: Repository<Content>,
    @InjectRepository(ContentVersion)
    private readonly versionRepo: Repository<ContentVersion>,
  ) {}

  async execute(id: string): Promise<Content & { versions: ContentVersion[] }> {
    const content = await this.contentRepo.findOneByOrFail({ id });

    const versions = await this.versionRepo.findBy({
      contentId: content.id,
    });

    return {
      ...content,
      versions: versions,
    };
  }
}
