import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { Rss } from '../rsses/domain/rss';
import { RssDataService } from './rss-data.service';
import Parser from 'rss-parser';

@Processor('insertRssData')
export class RssDataConsumer extends WorkerHost {
  constructor(private rssDataService: RssDataService) {
    super();
  }

  private readonly logger = new Logger(RssDataConsumer.name, {
    timestamp: true,
  });

  async process(job: Job<{ item: Parser.Item; rss: Rss }>): Promise<any> {
    this.logger.debug(`插入rss数据`);
    const isHas = await this.rssDataService.hasRssData(job.data.item.link!);

    if (!isHas) {
      this.logger.debug(`插入rss数据: ${job.data.item.title}`);
      await this.rssDataService.create({
        data: job.data.item,
        rss_id: job.data.rss,
        link: job.data.item.link!,
      });
      this.logger.debug(`插入rss数据成功: ${job.data.item.title}`);
    } else {
      this.logger.debug(`rss数据已存在: ${job.data.item.title}`);
    }
  }

  @OnWorkerEvent('failed')
  onFailed(err: Error) {
    this.logger.error(JSON.stringify(err.message));
  }
}
