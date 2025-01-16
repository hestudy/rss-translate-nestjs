import { RssDataModule } from '../rss-data/rss-data.module';
import { Module } from '@nestjs/common';
import { RssTranslatesService } from './rss-translates.service';
import { RssTranslatesController } from './rss-translates.controller';
import { RelationalRssTranslatePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    RssDataModule,

    // import modules, etc.
    RelationalRssTranslatePersistenceModule,
  ],
  controllers: [RssTranslatesController],
  providers: [RssTranslatesService],
  exports: [RssTranslatesService, RelationalRssTranslatePersistenceModule],
})
export class RssTranslatesModule {}
