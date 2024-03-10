import { Module } from '@nestjs/common';
import { HtmlProcessingService } from './html-processing.service';

@Module({
  providers: [HtmlProcessingService],
  exports: [HtmlProcessingService],
})
export class HtmlProcessingModule {}
