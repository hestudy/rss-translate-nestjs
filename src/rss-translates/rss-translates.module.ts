import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { RssDataModule } from '../rss-data/rss-data.module';
import { RelationalRssTranslatePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { RssTranslatesConsumer } from './rss-translates.consumer';
import { RssTranslatesController } from './rss-translates.controller';
import { RssTranslatesService } from './rss-translates.service';
import { TranslateService } from './translate.service';

@Module({
  imports: [
    RssDataModule,
    BullModule.registerQueue({
      name: 'rssTranslate',
    }),
    // import modules, etc.
    RelationalRssTranslatePersistenceModule,
  ],
  controllers: [RssTranslatesController],
  providers: [RssTranslatesService, RssTranslatesConsumer, TranslateService],
  exports: [RssTranslatesService, RelationalRssTranslatePersistenceModule],
})
export class RssTranslatesModule {}
