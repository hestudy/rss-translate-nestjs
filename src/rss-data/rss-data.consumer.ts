import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { Rss } from '../rsses/domain/rss';
import { RssDataService } from './rss-data.service';

@Processor('rssData')
export class RssDataConsumer extends WorkerHost {
  constructor(private rssDataService: RssDataService) {
    super();
  }

  private readonly logger = new Logger(RssDataConsumer.name, {
    timestamp: true,
  });

  async process(job: Job<Rss>): Promise<any> {
    this.logger.debug(`开始插入rss数据`);
    for await (const item of job.data.data?.items || []) {
      const isHas = await this.rssDataService.hasRssData(item.link);

      if (!isHas) {
        this.logger.debug(`插入rss数据: ${item.title}`);
        await this.rssDataService.create({
          data: item,
          rss_id: job.data,
          link: item.link,
        });
        this.logger.debug(`插入rss数据成功: ${item.title}`);
      } else {
        this.logger.debug(`rss数据已存在: ${item.title}`);
      }
    }
  }

  @OnWorkerEvent('failed')
  onFailed(err: Error) {
    this.logger.error(JSON.stringify(err.message));
  }
}
