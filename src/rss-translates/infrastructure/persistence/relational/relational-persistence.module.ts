import { Module } from '@nestjs/common';
import { RssTranslateRepository } from '../rss-translate.repository';
import { RssTranslateRelationalRepository } from './repositories/rss-translate.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RssTranslateEntity } from './entities/rss-translate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RssTranslateEntity])],
  providers: [
    {
      provide: RssTranslateRepository,
      useClass: RssTranslateRelationalRepository,
    },
  ],
  exports: [RssTranslateRepository],
})
export class RelationalRssTranslatePersistenceModule {}
