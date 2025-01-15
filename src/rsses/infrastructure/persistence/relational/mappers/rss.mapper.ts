import { Rss } from '../../../../domain/rss';

import { RssEntity } from '../entities/rss.entity';

export class RssMapper {
  static toDomain(raw: RssEntity): Rss {
    const domainEntity = new Rss();
    domainEntity.data = raw.data;

    domainEntity.link = raw.link;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Rss): RssEntity {
    const persistenceEntity = new RssEntity();
    persistenceEntity.data = domainEntity.data;

    persistenceEntity.link = domainEntity.link;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
