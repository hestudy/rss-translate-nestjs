import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { RssesModule } from '../rsses/rsses.module';
import { RelationalRssDataPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { RssDataConsumer } from './rss-data.consumer';
import { RssDataController } from './rss-data.controller';
import { RssDataService } from './rss-data.service';
import { InsertRssDataConsumer } from './insert-rss-data.consumer';

@Module({
  imports: [
    RssesModule,

    // import modules, etc.
    BullModule.registerQueue({
      name: 'rssData',
    }),
    BullModule.registerQueue({
      name: 'insertRssData',
    }),
    BullModule.registerQueue({
      name: 'rssTranslate',
    }),
    RelationalRssDataPersistenceModule,
  ],
  controllers: [RssDataController],
  providers: [RssDataService, RssDataConsumer, InsertRssDataConsumer],
  exports: [RssDataService, RelationalRssDataPersistenceModule],
})
export class RssDataModule {}
