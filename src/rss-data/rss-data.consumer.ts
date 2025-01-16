import {
  InjectQueue,
  OnWorkerEvent,
  Processor,
  WorkerHost,
} from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job, Queue } from 'bullmq';
import { Rss } from '../rsses/domain/rss';
import { RssDataService } from './rss-data.service';

@Processor('rssData')
export class RssDataConsumer extends WorkerHost {
  constructor(
    private rssDataService: RssDataService,
    @InjectQueue('insertRssData') private insertRssDataQueue: Queue,
  ) {
    super();
  }

  private readonly logger = new Logger(RssDataConsumer.name, {
    timestamp: true,
  });

  async process(job: Job<Rss>): Promise<any> {
    this.logger.debug(`遍历rss数据`);
    for await (const item of job.data.data?.items || []) {
      const isHas = await this.rssDataService.hasRssData(item.link);

      if (!isHas) {
        this.logger.debug(`添加队列: ${item.title}`);
        await this.insertRssDataQueue.add(
          'insertRssData',
          { item, rss: job.data },
          {
            jobId: item.link,
            removeOnComplete: true,
            removeOnFail: true,
          },
        );
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
