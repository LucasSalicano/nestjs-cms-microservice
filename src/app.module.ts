import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentModule } from './infrastructure/http/content/content.module';
import { BullmqProviderModule } from './infrastructure/queues/bullmq.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'cms',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ContentModule,
    BullmqProviderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
