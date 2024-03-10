import { Body, Controller, Post } from '@nestjs/common';
import { RequestService } from './request.service';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post()
  getDataFromUrl(@Body() dto) {
    return this.requestService.fetchData(dto.url);
  }
}
