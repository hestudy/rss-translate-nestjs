import { Injectable } from '@nestjs/common';
import Parser from 'rss-parser';

@Injectable()
export class RssParserService {
  private readonly rssParser = new Parser();

  async parseRssFeed(url: string): Promise<Parser.Output<any>> {
    return this.rssParser.parseURL(url);
  }
}
