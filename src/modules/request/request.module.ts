import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { HtmlProcessingModule } from '../html-processing/html-processing.module';

@Module({
  imports: [HtmlProcessingModule],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {}
