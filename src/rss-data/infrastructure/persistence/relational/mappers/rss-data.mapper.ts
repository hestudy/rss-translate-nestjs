import { RssData } from '../../../../domain/rss-data';

import { RssMapper } from '../../../../../rsses/infrastructure/persistence/relational/mappers/rss.mapper';

import { RssDataEntity } from '../entities/rss-data.entity';

export class RssDataMapper {
  static toDomain(raw: RssDataEntity): RssData {
    const domainEntity = new RssData();
    domainEntity.link = raw.link;

    if (raw.rss) {
      domainEntity.rss = RssMapper.toDomain(raw.rss);
    }

    domainEntity.data = raw.data;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: RssData): RssDataEntity {
    const persistenceEntity = new RssDataEntity();
    persistenceEntity.link = domainEntity.link;

    if (domainEntity.rss) {
      persistenceEntity.rss = RssMapper.toPersistence(domainEntity.rss);
    }

    persistenceEntity.data = domainEntity.data;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
