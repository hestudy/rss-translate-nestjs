import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { RssData } from '../rss-data/domain/rss-data';
import { RssTranslatesService } from './rss-translates.service';
import { TranslateService } from './translate.service';

@Processor('rssTranslate')
export class RssTranslatesConsumer extends WorkerHost {
  constructor(
    private rssTranslatesService: RssTranslatesService,
    private translateService: TranslateService,
  ) {
    super();
  }

  private readonly logger = new Logger(RssTranslatesConsumer.name, {
    timestamp: true,
  });

  async process(job: Job<RssData>): Promise<any> {
    this.logger.debug(`开始翻译rss标题 ${job.data.data.title}`);
    const translateTitle = await this.translateService.translate(
      job.data.data.title!,
    );
  }

  @OnWorkerEvent('failed')
  onFailed(err: Error) {
    this.logger.error(JSON.stringify(err.message));
  }
}
