import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from '../../../domain/entities/content.entity.js';
import { ContentController } from './content.controller.js';
import { ContentVersion } from '../../../domain/entities/content-versions.entity';
import { RedisPubSubModule } from '../../events/redis-pubsub.module';
import { GetAllContentWithVersionsUseCase } from '../../../application/use-cases/contents/get-all-content-with-versions.use-case';
import { CreateContentUseCase } from '../../../application/use-cases/contents/create-content.use-case';
import { UpdateContentUseCase } from '../../../application/use-cases/contents/update-content.use-case';
import { DeleteContentUseCase } from '../../../application/use-cases/contents/delete-content.use-case';
import { GetByIdContentUseCase } from '../../../application/use-cases/contents/get-by-id-content.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([Content, ContentVersion]),
    RedisPubSubModule,
  ],
  controllers: [ContentController],
  providers: [
    CreateContentUseCase,
    UpdateContentUseCase,
    GetAllContentWithVersionsUseCase,
    DeleteContentUseCase,
    GetByIdContentUseCase,
  ],
  exports: [UpdateContentUseCase],
})
export class ContentModule {}
