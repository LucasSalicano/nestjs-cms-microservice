import { Global, Module } from '@nestjs/common';
import { RedisPubSubService } from './redis-pubsub.service';
import { EventPublisher } from '../../application/services/event-emitter.port';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: EventPublisher,
      useClass: RedisPubSubService,
    },
  ],
  exports: [EventPublisher],
})
export class RedisPubSubModule {}
