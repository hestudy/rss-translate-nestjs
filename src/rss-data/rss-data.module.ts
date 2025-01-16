import { Module } from '@nestjs/common';
import { RssDataService } from './rss-data.service';
import { RssDataController } from './rss-data.controller';
import { RelationalRssDataPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    RelationalRssDataPersistenceModule,
  ],
  controllers: [RssDataController],
  providers: [RssDataService],
  exports: [RssDataService, RelationalRssDataPersistenceModule],
})
export class RssDataModule {}
