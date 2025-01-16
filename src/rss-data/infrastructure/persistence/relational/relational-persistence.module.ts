import { Module } from '@nestjs/common';
import { RssDataRepository } from '../rss-data.repository';
import { RssDataRelationalRepository } from './repositories/rss-data.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RssDataEntity } from './entities/rss-data.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RssDataEntity])],
  providers: [
    {
      provide: RssDataRepository,
      useClass: RssDataRelationalRepository,
    },
  ],
  exports: [RssDataRepository],
})
export class RelationalRssDataPersistenceModule {}
