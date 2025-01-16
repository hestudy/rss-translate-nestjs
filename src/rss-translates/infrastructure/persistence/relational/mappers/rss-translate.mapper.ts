import { RssTranslate } from '../../../../domain/rss-translate';
import { RssDataMapper } from '../../../../../rss-data/infrastructure/persistence/relational/mappers/rss-data.mapper';

import { RssTranslateEntity } from '../entities/rss-translate.entity';

export class RssTranslateMapper {
  static toDomain(raw: RssTranslateEntity): RssTranslate {
    const domainEntity = new RssTranslate();
    if (raw.rssData) {
      domainEntity.rssData = RssDataMapper.toDomain(raw.rssData);
    }

    domainEntity.content = raw.content;

    domainEntity.title = raw.title;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: RssTranslate): RssTranslateEntity {
    const persistenceEntity = new RssTranslateEntity();
    if (domainEntity.rssData) {
      persistenceEntity.rssData = RssDataMapper.toPersistence(
        domainEntity.rssData,
      );
    }

    persistenceEntity.content = domainEntity.content;

    persistenceEntity.title = domainEntity.title;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
