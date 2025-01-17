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
    const isHas = await this.rssTranslatesService.hasLink(job.data.link);
    if (!isHas) {
      this.logger.debug(`开始翻译rss标题 ${job.data.data.title}`);

      const translateTitle = await this.translateService.translate(
        job.data.data.title!,
      );

      let translateContent = '';

      if (!!job.data.data.content) {
        this.logger.debug(
          `开始翻译rss内容 ${job.data.data.content?.slice(0, 100)}...`,
        );
        translateContent = await this.translateService.translate(
          job.data.data.content!,
        );
      }
      await this.rssTranslatesService.create({
        link: job.data.link,
        title: translateTitle,
        content: translateContent,
        rssData: job.data,
      });
      this.logger.debug(`保存rss翻译完成 ${job.data.link}`);
    } else {
      this.logger.debug(`已经翻译过rss ${job.data.link}`);
    }
  }

  @OnWorkerEvent('failed')
  onFailed(err: Error) {
    this.logger.error(JSON.stringify(err.message));
  }
}
