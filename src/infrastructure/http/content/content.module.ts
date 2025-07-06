import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from '../../../domain/entities/content.entity.js';
import { ContentController } from './content.controller.js';
import { CreateContentUseCase } from '../../../application/use-cases/create-content.use-case.js';
import { UpdateContentUseCase } from '../../../application/use-cases/update-content.use-case';
import { ContentVersion } from '../../../domain/entities/content-versions.entity';
import { GetAllContentWithVersionsUseCase } from '../../../application/use-cases/get-all-content-with-versions.use-case';
import { DeleteContentUseCase } from '../../../application/use-cases/delete-content.use-case';
import { RedisPubSubModule } from '../../events/redis-pubsub.module';
// import { ContentQueueService } from '../../queues/services/content-queue.service.js';

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
  ],
})
export class ContentModule {}
