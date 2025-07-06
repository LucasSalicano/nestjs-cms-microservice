import { Module, Global } from '@nestjs/common';
import IORedis from 'ioredis';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS',
      useFactory: () => new IORedis(),
    },
  ],
  exports: ['REDIS'],
})
export class BullmqProviderModule {}
