import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentVersion } from '../../../domain/entities/content-versions.entity';
import { Content } from '../../../domain/entities/content.entity';

@Injectable()
export class GetAllContentWithVersionsUseCase {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepo: Repository<Content>,
    @InjectRepository(ContentVersion)
    private readonly versionRepo: Repository<ContentVersion>,
  ) {}

  async execute(): Promise<Array<Content & { versions: ContentVersion[] }>> {
    const contents = await this.contentRepo.find();

    const versions = await this.versionRepo.find();
    const versionsByContent = versions.reduce(
      (acc, version) => {
        if (!acc[version.contentId]) acc[version.contentId] = [];
        acc[version.contentId].push(version);
        return acc;
      },
      {} as Record<string, ContentVersion[]>,
    );

    return contents.map((content) => ({
      ...content,
      versions: versionsByContent[content.id] || [],
    }));
  }
}
