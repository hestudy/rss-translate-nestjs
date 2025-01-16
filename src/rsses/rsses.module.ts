import { Module } from '@nestjs/common';
import { RssesService } from './rsses.service';
import { RssesController } from './rsses.controller';
import { RelationalRssPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { BullModule } from '@nestjs/bullmq';
import { RssConsumer } from './rsses.consumer';
import { RssParserService } from './rssesParser.service';

@Module({
  imports: [
    // import modules, etc.
    RelationalRssPersistenceModule,
    BullModule.registerQueue({
      name: 'rss',
    }),
  ],
  controllers: [RssesController],
  providers: [RssesService, RssConsumer, RssParserService],
  exports: [RssesService, RelationalRssPersistenceModule],
})
export class RssesModule {}
