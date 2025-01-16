import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { RelationalRssPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { RssConsumer } from './rsses.consumer';
import { RssesController } from './rsses.controller';
import { RssesService } from './rsses.service';
import { RssParserService } from './rssesParser.service';

@Module({
  imports: [
    // import modules, etc.
    RelationalRssPersistenceModule,
    BullModule.registerQueue({
      name: 'rss',
    }),
    BullModule.registerQueue({
      name: 'rssData',
    }),
  ],
  controllers: [RssesController],
  providers: [RssesService, RssConsumer, RssParserService],
  exports: [RssesService, RelationalRssPersistenceModule],
})
export class RssesModule {}
