import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentModule } from './infrastructure/http/content/content.module';
import { AuthModule } from './infrastructure/http/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WebSocketModule } from './infrastructure/websockets/websocket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: +config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        synchronize: config.get('DB_SYNC') === 'true',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
    }),
    ContentModule,
    AuthModule,
    WebSocketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
