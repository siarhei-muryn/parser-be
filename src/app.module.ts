import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestModule } from './modules/request/request.module';
import { HtmlProcessingModule } from './modules/html-processing/html-processing.module';

@Module({
  imports: [RequestModule, HtmlProcessingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
