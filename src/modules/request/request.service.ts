import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { HtmlProcessingService } from '../html-processing/html-processing.service';

interface IRequestService {
  fetchData(url: string): Promise<string>;
}

@Injectable()
export class RequestService implements IRequestService {
  constructor(private readonly htmlProcessingService: HtmlProcessingService) {}

  async fetchData(url: string): Promise<any> {
    try {
      const response = await axios.get(url);
      const processed = this.htmlProcessingService.processHtml(response.data);
      return processed;
    } catch (error) {
      throw new Error(`Failed to fetch data from ${url}: ${error.message}`);
    }
  }
}
