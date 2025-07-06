import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from '../../../domain/entities/content.entity';

@Injectable()
export class CreateContentUseCase {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepo: Repository<Content>,
  ) {}

  async execute(
    data: { title: string; body: string },
    userId: string,
  ): Promise<Content> {
    const content = this.contentRepo.create({ ...data, createdBy: userId });
    return await this.contentRepo.save(content);
  }
}
