import { RssesModule } from '../rsses/rsses.module';
import { Module } from '@nestjs/common';
import { RssDataService } from './rss-data.service';
import { RssDataController } from './rss-data.controller';
import { RelationalRssDataPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { RssDataConsumer } from './rss-data.consumer';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    RssesModule,

    // import modules, etc.
    BullModule.registerQueue({
      name: 'rssData',
    }),
    BullModule.registerQueue({
      name: 'rssTranslate',
    }),
    RelationalRssDataPersistenceModule,
  ],
  controllers: [RssDataController],
  providers: [RssDataService, RssDataConsumer],
  exports: [RssDataService, RelationalRssDataPersistenceModule],
})
export class RssDataModule {}
