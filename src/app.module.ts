import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventService } from './event.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService,EventEmitter2,EventService],
})
export class AppModule {}
