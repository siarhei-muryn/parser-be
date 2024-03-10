import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';

@Injectable()
export class HtmlProcessingService {
  constructor() {}

  private readonly unnecessaryTags: string[] = [
    'head',
    'script',
    'style',
    'meta',
    'link',
    'noscript',
    'comment',
  ];

  processHtml(html: string): any {
    const clearedHtml = this.removeUnnecessaryTags(html);
    return this.findFrequentTags(clearedHtml);
  }

  private removeUnnecessaryTags(html: string): string {
    const $ = cheerio.load(html);

    this.unnecessaryTags.forEach((tag) => {
      $(tag).empty();
      $(tag).remove();
    });

    $('*').each((index, element) => {
      if ($(element).text().trim() === '') {
        $(element).remove();
      }
    });

    return $.html();
  }

  findFrequentTags(html: string): Record<string, number> {
    const $ = cheerio.load(html);
    const tagsFrequency: Record<string, number> = {};

    const processElement = (element: any) => {
      const fullSelector = this.getFullSelector($(element));
      tagsFrequency[fullSelector] = (tagsFrequency[fullSelector] || 0) + 1;

      $(element)
        .children()
        .each((index, childElement) => {
          processElement(childElement);
        });
    };

    $('body')
      .children()
      .each((index, element) => {
        processElement(element);
      });

    // Сортируем теги по убыванию частоты
    const sortedTags = Object.entries(tagsFrequency).sort(
      ([, countA], [, countB]) => countB - countA,
    );

    // Преобразуем отсортированный список в объект
    const sortedTagsObject: Record<string, number> = {};
    sortedTags.forEach(([fullSelector, count], index) => {
      sortedTagsObject[`${fullSelector}`] = count;
    });

    return sortedTagsObject;
  }

  private getFullSelector(el: any): string {
    const element = el[0];
    let fullSelector = element.name || '';
    if (element.attribs) {
      for (const [attr, value] of Object.entries(element.attribs)) {
        if (attr !== 'class' && attr !== 'id') {
          fullSelector += `[${attr}="${value}"]`;
        }
      }
      if (element.attribs.class) {
        const classNames = element.attribs.class.split(' ');
        fullSelector += classNames.map((className) => `.${className}`).join('');
      }
      if (element.attribs.id) {
        fullSelector += `#${element.attribs.id}`;
      }
    }
    return fullSelector;
  }
}
