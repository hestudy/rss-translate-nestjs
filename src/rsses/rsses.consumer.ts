import {
  InjectQueue,
  OnWorkerEvent,
  Processor,
  WorkerHost,
} from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job, Queue } from 'bullmq';
import { Rss } from './domain/rss';
import { RssesService } from './rsses.service';
import { RssParserService } from './rssesParser.service';

@Processor('rss')
export class RssConsumer extends WorkerHost {
  constructor(
    private rssParserService: RssParserService,
    private rssService: RssesService,
    @InjectQueue('rssData') private rssDataQueue: Queue,
  ) {
    super();
  }

  private readonly logger = new Logger(RssConsumer.name, { timestamp: true });

  async process(job: Job<Rss>): Promise<any> {
    this.logger.debug(`开始获取rss: ${job.data.link}`);
    const feed = await this.rssParserService.parseRssFeed(job.data.link);
    this.logger.debug(
      `获取rss成功: ${job.data.link}，数据条数: ${feed.items.length}`,
    );
    const result = await this.rssService.update(job.data.id, {
      data: feed,
    });
    this.logger.debug(`更新rss成功: ${job.data.link}`);
    this.rssDataQueue.add('rssData', result, {
      jobId: result?.id,
    });
  }

  @OnWorkerEvent('failed')
  onFailed(err: Error) {
    this.logger.error(JSON.stringify(err));
  }
}
