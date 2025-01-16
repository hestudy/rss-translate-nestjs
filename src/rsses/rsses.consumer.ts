import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { Rss } from './domain/rss';
import { RssParserService } from './rssesParser.service';
import { RssesService } from './rsses.service';

@Processor('rss')
export class RssConsumer extends WorkerHost {
  constructor(
    private rssParserService: RssParserService,
    private rssService: RssesService,
  ) {
    super();
  }

  private readonly logger = new Logger(RssConsumer.name, { timestamp: true });

  async process(job: Job<Rss>, token?: string): Promise<any> {
    this.logger.debug(JSON.stringify(job), token);
    const feed = await this.rssParserService.parseRssFeed(job.data.link);
    this.logger.debug(feed.title, feed.items.length);
    return this.rssService.update(job.data.id, {
      data: feed,
    });
  }

  @OnWorkerEvent('failed')
  onFailed(err: Error) {
    this.logger.error(JSON.stringify(err));
  }
}
