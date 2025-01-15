import { Module } from '@nestjs/common';
import { RssRepository } from '../rss.repository';
import { RssRelationalRepository } from './repositories/rss.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RssEntity } from './entities/rss.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RssEntity])],
  providers: [
    {
      provide: RssRepository,
      useClass: RssRelationalRepository,
    },
  ],
  exports: [RssRepository],
})
export class RelationalRssPersistenceModule {}
